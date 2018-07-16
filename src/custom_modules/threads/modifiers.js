import * as Transform from './transforms.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  addPoint,
  nextThread,
  prevThread,
  addThread,
  updateThreadSpeed,
  toggleBuildMode,
  undoLastPoint,
  playPause,
  moveSpindle,
  moveCamera
}
const m4 = twgl.m4
const v3 = twgl.v3

// Thread Modifications
/**
 * Changes the rotation speed of the thread that
 * is currently active
 * @param  scene   master scene object
 * @param  options {stepSize, direction}
 */
function updateThreadSpeed (scene, options) {
  options = options || {}
  let stepSize = options.stepSize || scene.settings.stepSize
  let direction = options.direction || [0, 0, 0]
  let activeThread = scene.activeThread
  let rotationSpeed = scene.threads[activeThread].rotationSpeed
  for (let i = 0; i < direction.length; i++) {
    rotationSpeed[i] += direction[i] * stepSize
  }
}
function moveSpindle (scene, options) {
  options = options || {}
  let stepSize = options.stepSize || scene.settings.stepSize
  let direction = options.direction || [0, 0, 0]
  let activeThread = scene.activeThread
  let position = scene.threads[activeThread].position
  for (let i = 0; i < direction.length; i++) {
    position[i] += direction[i] * stepSize
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
function addThread (scene) {
  let hue = Math.random() * 360 // scale 0 - 360 for hue
  let color = 'hsl(' + hue + ', 100%, 50%)'
  let newThread = {
    'position': [0, 0, 0],
    'rotation': [0, 0, 0],
    'rotationSpeed': [0, 0, 0],
    'color': color,
    'points': [],
    'tx': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  scene.threads.push(newThread)
  scene.activeThread = scene.threads.length - 1
}
function undoLastPoint (scene, options) {
  options = options || {}
  let numPoints = options.numberOfPoints || 1
  let activeThread = scene.activeThread
  for (let i = 0; i < numPoints; i++) {
    scene.threads[activeThread].points.pop()
  }
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
// Scene Modifications
function toggleBuildMode (scene) {
  scene.grid.isVisible = !scene.grid.isVisible
  scene.spindle.isVisible = !scene.spindle.isVisible
}
function playPause (scene, options) {
  scene.paused = options.paused || !scene.paused
}
function moveCamera (scene, options) {
  options = options || {}
  let thetaStep = options.thetaStep || 0
  let phiStep = options.phiStep || 0
  scene.camera.theta = (scene.camera.theta + thetaStep) % (2 * Math.PI)
  scene.camera.phi = scene.camera.phi + phiStep
  // Bound camera position, TODO clean up magic numbers
  scene.camera.phi = scene.camera.phi > Math.PI - 0.1 ? Math.PI - 0.1 : scene.camera.phi
  scene.camera.phi = scene.camera.phi < 0 ? 0.01 : scene.camera.phi
}
