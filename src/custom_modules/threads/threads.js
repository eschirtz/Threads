import * as Util from './utility.js'
import * as Transform from './transforms.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  render,
  update,
  initialize,
  addPoint
}
const m4 = twgl.m4

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
  let currentThread = scene.threads[scene.activeThread]
  let tx = Transform.combine([scene.camera.tx, currentThread.tx])
  let invTx = m4.inverse(tx)
  let point = m4.transformPoint(invTx, [x, y, -scene.camera.position[2]])
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
  let camera = scene.camera // camera contains projection data
  let grid = scene.grid
  let spindle = scene.spindle
  // Camera Projection Viewport transform
  let Tcamera = camera.tx
  let Tprojection = m4.perspective(Math.PI / 1.2, scene.width / scene.height, 5, 400)
  let Tviewport = m4.multiply(m4.scaling([scene.width, -scene.height, 10]), m4.translation([scene.width / 2, -scene.height / 2, 0]))
  let Tcpv = m4.multiply(m4.multiply(Tcamera, Tprojection), Tviewport)
  // Clear canvas for drawing
  ctx.clearRect(0, 0, scene.width, scene.height)
  // Draw all threads to screne
  scene.threads.forEach(function (thread) {
    // Calculate the projection transform
    let tx = m4.multiply(thread.tx, Tcpv)
    Util.renderThread(tx, thread, ctx)
  })
  // Draw the rest of the environement
  if (spindle.isVisible) {
    let tx = m4.multiply(spindle.tx, Tcpv)
    Util.renderSpindle(tx, 10, ctx, spindle.color)
  }
  if (grid.isVisible) {
    let tx = m4.multiply(grid.tx, Tcpv)
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
  // Update camera transform
  camera.tx = m4.lookAt(camera.position, camera.target, camera.up)
  // Update each thread
  scene.threads.forEach(function (thread) {
    let dt = 1 / 60 // difference in time since last call
    thread.rotation[0] += thread.rotationSpeed[0] * dt
    thread.rotation[1] += thread.rotationSpeed[1] * dt
    thread.rotation[2] += thread.rotationSpeed[2] * dt
    let Txtrans = m4.translation(thread.position)
    let Txrot = m4.rotationX(thread.rotation[0])
    let Tyrot = m4.rotationY(thread.rotation[1])
    let Tzrot = m4.rotationZ(thread.rotation[2])
    let Trotation = Transform.combine([Txrot, Tyrot, Tzrot])
    thread.tx = m4.multiply(Txtrans, Trotation)
  })
  // update spindle position to match active thread
  scene.spindle.tx = scene.threads[scene.activeThread].tx
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
