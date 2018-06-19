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
  let currentThread = scene.threads[scene.threads.length - 1] // TODO: chose thread
  let tx = Transform.combine([scene.camera.tx, currentThread.tx])
  let invTx = m4.inverse(tx)
  let point = m4.transformPoint(invTx, [x, y, 0])
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
  // Clear canvas for drawing
  ctx.clearRect(0, 0, scene.width, scene.height)
  // Draw all threads to screne
  scene.threads.forEach(function (thread) {
    // Calculate the projection transform
    let tx = Transform.combine([camera.tx, thread.tx])
    Util.renderThread(tx, thread, ctx)
  })
  // Draw the rest of the environement
  if (scene.spindle.isVisible) {
    let tx = Transform.combine([camera.tx, scene.spindle.tx])
    Util.renderSpindle(tx, 10, ctx, 'orange')
  }
  if (grid.isVisible) {
    let tx = Transform.combine([camera.tx, scene.grid.tx])
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
  // Calculate camera transform
  let TScreenPosition = m4.translation([scene.width / 2, scene.height / 2, 0])
  let TScreenOrientation = m4.scaling([1, -1, 1])
  let txTemp = Transform.computeCameraTx(camera)
  camera.tx = Transform.combine([TScreenPosition, TScreenOrientation, txTemp])
  // Update each thread
  scene.threads.forEach(function (thread) {
    let dx = 1 / 60 // difference in time since last call
    let Tx = thread.tx // get the transform to be updated
    // Rotations
    Tx = m4.axisRotate(Tx, [1, 0, 0], thread.rotationSpeed.x * dx)
    Tx = m4.axisRotate(Tx, [0, 1, 0], thread.rotationSpeed.y * dx)
    Tx = m4.axisRotate(Tx, [0, 0, 1], thread.rotationSpeed.z * dx)
    // update the threads transform
    thread.tx = Tx
  })
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
