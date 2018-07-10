/**
 * Top level application code, relies
 * on the following custom modules
 * @type {[type]}
 */
import * as Util from './utility.js'
import * as Transform from './transforms.js'
import * as Controller from './controller.js'
import * as Modifiers from './modifiers.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  render,
  update,
  initialize,
  Controller,
  Modifiers
}
const m4 = twgl.m4

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
  let orbitalCamera = true
  if (orbitalCamera) {
    camera.position[0] = camera.radius * Math.sin(camera.phi) * Math.cos(camera.theta)
    camera.position[2] = camera.radius * Math.sin(camera.phi) * Math.sin(camera.theta)
    camera.position[1] = camera.radius * Math.cos(camera.phi)
  }
  camera.target = scene.spindle.position
  // Update each thread
  scene.threads.forEach(function (thread) {
    let timeSinceLastCall = 1 / 60 // difference in time since last call TODO
    let dt = scene.paused ? 0 : timeSinceLastCall // pause all motion
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
  Controller.initialize(scene, canvas)
  render(scene, canvas)
  return scene
}
