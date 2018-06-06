import * as Util from './utility.js'
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
const m4 = twgl.m4
let ctx
let canvas

function addPoint (scene, x, y) {
  let currentThread = scene.threads[scene.threads.length - 1]
  console.log(currentThread)
  currentThread.points.push([x, y, 0])
}
/**
 * Render is responsible for drawing the
 * scene to the screen, the scene is all
 * in world coordinates (camera description too)
 * @param  {[type]} scene  [description]
 * @param  {[type]} canvas [description]
 * @return {[type]}        [description]
 */
function render (scene) {
  let width = canvas.width
  let height = canvas.height
  ctx.clearRect(0, 0, width, height)
  // TODO: Calculate camera transform

  // Draw all threads to screne
  scene.threads.forEach(function (thread) {
    ctx.beginPath()
    ctx.strokeStyle = thread.color
    let points = thread.points
    if (points.length > 0) {
      Util.moveToTx(points[0], m4.identity(), ctx)
    }
    for (let i = 1; i < points.length; i++) {
      Util.lineToTx(points[i], m4.identity(), ctx)
    }
    ctx.stroke()
  })
  // Draw rest of environement
  Util.drawSpindle(m4.translation([200, 200]), 10, ctx)
}

/**
 * Update is called every frame and causes
 * the animation
 * @return {[type]} [description]
 */
function update () {
  console.log('updating')
}

/**
 * Initialize sets up the global "canvas" and
 * "context" variables, as well as rendering the first
 * frame
 * @param  {[type]} c          [html canvas element]
 * @param  {[type]} savedScene [optional scene object to load]
 * @return {[type]} scene      [a new instance of the scene]
 */
function initialize (c, savedScene) {
  // setup the drawing context
  canvas = c
  ctx = canvas.getContext('2d')
  // Load / Create scene
  let scene = {}
  if (savedScene !== undefined) {
    scene = savedScene // load the scene
  }
  scene.lastLoaded = new Date()
  render(scene)
  return scene
}

export {render, update, initialize, addPoint}
