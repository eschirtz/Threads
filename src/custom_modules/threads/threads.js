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
  currentThread.points.push([x, y, 0])
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
    console.error('Failed to render: "' + scene.name + '"')
    return false // indicate fail to render
  }
  let width = canvas.width
  let height = canvas.height
  let ctx = canvas.getContext('2d')
  let camera = scene.camera
  let grid = scene.grid
  // Clear canvas for drawing
  ctx.clearRect(0, 0, width, height)
  // Calculate camera transform
  let TScreenPosition = m4.translation([width / 2, height / 2, 0])
  let TScreenOrientation = m4.scaling([1, -1, 1])
  let txTemp = Transform.computeCameraTx(camera)
  let Tcamera = Transform.combine([TScreenPosition, TScreenOrientation, txTemp])
  // Draw all threads to screne
  scene.threads.forEach(function (thread) {
    // Calculate transform
    let Tmvp = Transform.combine([Tcamera, thread.tx])
    Util.renderThread(Tmvp, thread, ctx)
  })
  // Draw rest of environement
  if (scene.spindle.isVisible) {
    Util.renderSpindle(scene.spindle.tx, 10, ctx, 'orange')
  }
  if (grid.isVisible) {
    Util.renderGrid(Tcamera, grid.spacing, grid.divisions, ctx, grid.color)
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
