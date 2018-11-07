/**
 * Top level application code, entry point
 * / wrapper for Threads
 * @file
 */

import * as Renderer from './renderer.js'
import * as Transform from './transforms.js'
import * as Controller from './controller.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
import store from '@/store'
const canvasDpiScaler = require('canvas-dpi-scaler')

export {
  render,
  update,
  initialize,
  setCanvasSize,
  Controller
}
const m4 = twgl.m4

/**
 * Render generates transforms,
 * and wraps certain drawing functions
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
  let Tcamera = Transform.cameraTx(camera.position, camera.target, camera.up)
  let Tprojection = m4.perspective(camera.fieldOfView, scene.width / scene.height, camera.zNear, camera.zFar)
  let Tviewport = Transform.viewportTx(scene.width, scene.height, true)
  // View + Projection Matrix
  let Tcpv = Transform.combine([Tviewport, Tprojection, Tcamera])
  // Clear canvas for drawing
  ctx.clearRect(0, 0, scene.width, scene.height)
  // Draw all threads to scene
  scene.threads.forEach(function (thread) {
    let tx = Transform.combine([Tcpv, thread.tx])
    Renderer.renderThread(tx, thread, ctx)
  })
  // Draw the spindle
  if (spindle.isVisible) {
    let tx = Transform.combine([Tcpv, scene.threads[scene.activeThread].tx])
    Renderer.renderSpindle(tx, spindle.size, ctx, spindle.color)
  }
  // Draw the grid
  if (grid.isVisible) {
    let tx = Transform.combine([Tcpv, grid.tx])
    Renderer.renderGrid(tx, grid.spacing, grid.divisions, ctx, grid.color)
  }
}

/**
 * Initialize sets up the global "canvas" and
 * "context" variables, as well as rendering the first
 * frame
 * @param  {[type]} canvas     [html canvas element]
 * @param  {[type]} scene [optional scene object to load]
 */
function initialize (canvas, scene) {
  setCanvasSize(canvas)
  Controller.initialize(canvas)
  render(scene, canvas)
}

/**
 * Wrapper to keep everything contained in Threads
 * @return {[type]} [description]
 */
function update (dt) {
  store.commit('scene/update', dt)
}
/**
 * configure drawing elements
 */
function setCanvasSize (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  store.commit('scene/setSize', {
    width: window.innerWidth, height: window.innerHeight
  })
  canvasDpiScaler(canvas, canvas.getContext('2d'))
  render(store.state.scene, canvas) // re-render
}
