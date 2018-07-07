import * as Transform from './transforms.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  addPoint,
  nextThread,
  prevThread,
  updateThreadSpeed,
  toggleBuildMode
}
const m4 = twgl.m4
const v3 = twgl.v3

function updateThreadSpeed (scene, options) {
  options = options || {}
  let stepSize = options.stepSize || 1
  let direction = options.direction || [0, 0, 0]
  let activeThread = scene.activeThread
  let rotationSpeed = scene.threads[activeThread].rotationSpeed
  for (let i = 0; i < direction.length; i++) {
    rotationSpeed[i] += direction[i] * stepSize
  }
}
function nextThread (scene) {
  let length = scene.threads.length
  let current = scene.activeThread
  current = current + 1 < length
    ? current + 1
    : current
  scene.activeThread = current
}
function prevThread (scene) {
  let current = scene.activeThread
  current = current - 1 >= 0
    ? current - 1
    : current
  scene.activeThread = current
}
function toggleBuildMode (scene) {
  scene.grid.isVisible = !scene.grid.isVisible
  scene.spindle.isVisible = !scene.spindle.isVisible
}
/**
 * Adds a single point into the scene
 * specified by the input parameters
 * No rendering is done here, purely mutations
 * to the scene
 * @param {[type]} scene [description]
 * @param {[type]} x     [description]
 * @param {[type]} y     [description]
 */
function addPoint (scene, x, y) {
  let camera = scene.camera
  let currentThread = scene.threads[scene.activeThread]
  // Compute the camera projection viewport transform
  let Tcamera = Transform.cameraTx(
    camera.position,
    camera.target,
    camera.up)
  let Tprojection = m4.perspective(
    camera.fieldOfView,
    scene.width / scene.height,
    camera.zNear,
    camera.zFar)
  let Tviewport = Transform.viewportTx(
    scene.width,
    scene.height,
    true
  )
  let Tmodel = currentThread.tx
  let zNear = camera.zNear
  let zFar = camera.zFar
  let d = v3.distance(camera.position, currentThread.position)
  // For some insight into how the "clippedDepth" value is calculated
  // https://www.jwwalker.com/pages/depth_resolution.html
  let clippedDepth = 2 * ((zFar + zNear) / (2 * (zFar - zNear)) -
    zNear * zFar / (d * (zFar - zNear)) + 0.5) - 1
  let Tx = Transform.combine([Tviewport, Tprojection, Tcamera, Tmodel])
  let iTx = m4.inverse(Tx)
  let point = m4.transformPoint(iTx, [x, y, clippedDepth])
  currentThread.points.push(point)
}
