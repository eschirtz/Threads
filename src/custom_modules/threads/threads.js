import * as Util from './utility.js'
import * as Transform from './transforms.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  render,
  update,
  initialize,
  addPoint,
  Util,
  Transform
}
const m4 = twgl.m4
const v3 = twgl.v3

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
/**
 * Render is responsible for drawing the
 * scene to the screen, the scene is all
 * in world coordinates (camera description too)
 * @param  {[type]} scene  [description]
 * @param  {[type]} canvas [description]
 */
function render (scene, canvas) {
  if (canvas === undefined) {
    console.error('HTML canvas is required to render scene "' + scene.name + '"')
    return false // indicate fail to render
  }
  let ctx = canvas.getContext('2d')
  let grid = scene.grid
  let spindle = scene.spindle
  let camera = scene.camera
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
  // View + Projection Matrix
  let Tcpv = Transform.combine([Tviewport, Tprojection, Tcamera])
  // Clear canvas for drawing
  ctx.clearRect(0, 0, scene.width, scene.height)
  // Draw all threads to scene
  scene.threads.forEach(function (thread) {
    let tx = Transform.combine([Tcpv, thread.tx])
    Util.renderThread(tx, thread, ctx)
  })
  // Draw the spindle
  if (spindle.isVisible) {
    let tx = Transform.combine([Tcpv, spindle.tx])
    Util.renderSpindle(tx, spindle.size, ctx, spindle.color)
  }
  // Draw the grid
  if (grid.isVisible) {
    let tx = Transform.combine([Tcpv, grid.tx])
    Util.renderGrid(tx, grid.spacing, grid.divisions, ctx, grid.color)
  }
}

/**
 * Update is called every frame and causes
 * the animation.
 * User input INDEPENDANT, soley updates based
 * on data provided by the scene
 * @return {[type]} [description]
 */
function update (scene) {
  // Update camera
  let camera = scene.camera
  let orbitalCamera = false
  if (orbitalCamera) {
    camera.position[0] = camera.radius * Math.sin(camera.phi) * Math.cos(camera.theta)
    camera.position[2] = camera.radius * Math.sin(camera.phi) * Math.sin(camera.theta)
    camera.position[1] = camera.radius * Math.cos(camera.phi)
  }
  camera.target = scene.spindle.position
  // Update each thread
  scene.threads.forEach(function (thread) {
    let dt = 1 / 60 // difference in time since last call TODO
    thread.rotation[0] += thread.rotationSpeed[0] * dt
    thread.rotation[1] += thread.rotationSpeed[1] * dt
    thread.rotation[2] += thread.rotationSpeed[2] * dt
    // update each model transform
    let Trotation = Transform.combine([
      m4.rotationX(thread.rotation[0]),
      m4.rotationY(thread.rotation[1]),
      m4.rotationZ(thread.rotation[2])
    ])
    let Tposition = m4.translation(thread.position)
    thread.tx = Transform.combine([Tposition, Trotation])
  })
  // update spindle position to match active thread
  scene.spindle.tx = scene.threads[scene.activeThread].tx
  scene.spindle.position = scene.threads[scene.activeThread].position
}

/**
 * Initialize sets up the global "canvas" and
 * "context" variables, as well as rendering the first
 * frame
 * @param  {[type]} canvas     [html canvas element]
 * @param  {[type]} savedScene [optional scene object to load]
 * @return {[type]} scene      [a new instance of the scene]
 */
function initialize (canvas, savedScene) {
  // Load / Create scene
  let scene = {}
  if (savedScene !== undefined) {
    scene = savedScene // load the scene
  }
  scene.lastLoaded = new Date()
  render(scene, canvas)
  return scene
}
