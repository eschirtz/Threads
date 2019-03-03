/**
 * This file includes helper functions
 * to be used with the HTML "Canvas" object.
 *
 * @author Eric Schirtzinger
 */

import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  renderGrid,
  renderSpindle,
  renderThread,
  moveToTx,
  lineToTx
}
const m4 = twgl.m4

/**
 * draws a thread (series of coordinate triples)
 * to the screen, conecting each point
 * @param  {[type]} thread [description]
 * @param  {[type]} ctx    [description]
 * @param  {[type]} Tmvp   [description]
 * @return {[type]}        [description]
 */
function renderThread (Tmvp, thread, context) {
  context.beginPath()
  context.strokeStyle = thread.color
  let points = thread.points || {}
  if (points.length > 0) {
    moveToTx(points[0], Tmvp, context)
  }
  for (let i = 1; i < points.length; i++) {
    if (points[i]) {
      lineToTx(points[i], Tmvp, context)
    } else {
      context.stroke()
      context.beginPath()
    }
  }
  context.stroke()
}

/**
 * moveToTx() move the path to the 2d point on the
 * canvas specified by 3d coordinate and transform.
 * @param loc // the 3d coordinate triple
 * @param Tx // the 4x4 transformation matrix
 * @param context // html canvas context
 */
function moveToTx (loc, Tx, context) {
  var locTx = m4.transformPoint(Tx, loc)
  // Round to integer value if you want no anti-aliasing
  // locTx[0] = (0.5 + locTx[0]) | 0
  // locTx[0] = ~~(0.5 + locTx[0])
  // locTx[0] = (0.5 + locTx[0]) << 0
  // locTx[1] = (0.5 + locTx[1]) | 0
  // locTx[1] = ~~(0.5 + locTx[1])
  // locTx[1] = (0.5 + locTx[1]) << 0
  context.moveTo(locTx[0], locTx[1])
}

/**
 * lineToTx() creates a line from previous point to
 * new specified point, transforms coordinate triple,
 * drops the z component and plots
 * in (x,y). Does not draw the line.
 * @param loc // the 3d coordinate triple
 * @param Tx // the 4x4 transformation matrix
 * @param context // html canvas context
 */
function lineToTx (loc, Tx, context) {
  var locTx = m4.transformPoint(Tx, loc)
  // Round to integer value if you want no anti-aliasing
  // locTx[0] = (0.5 + locTx[0]) | 0
  // locTx[0] = ~~(0.5 + locTx[0])
  // locTx[0] = (0.5 + locTx[0]) << 0
  // locTx[1] = (0.5 + locTx[1]) | 0
  // locTx[1] = ~~(0.5 + locTx[1])
  // locTx[1] = (0.5 + locTx[1]) << 0
  context.lineTo(locTx[0], locTx[1])
}

/**
 * renderSpindle() draws an axis to
 * the canvas, transforming it via the transformation
 * matrix specified by the user.
 * @param Tx // the 4x4 transformation matrix
 * @param size // the size of axis
 * @param context // html convas canvas
 * @param color // OPTIONAL, string specified color
 */
function renderSpindle (Tx, size, context, color) {
  context.strokeStyle = color || 'white'
  context.beginPath()
  moveToTx([-size, 0, 0], Tx, context)
  lineToTx([size, 0, 0], Tx, context)
  context.stroke() // x-axis
  moveToTx([0, -size, 0], Tx, context)
  lineToTx([0, size, 0], Tx, context)
  context.stroke() // y-axis
  moveToTx([0, 0, -size], Tx, context)
  lineToTx([0, 0, size], Tx, context)
  context.stroke() // z-axis
}

/**
  * renderGrid() draws a grid to
  * the canvas with specified transform
  * @param Tx 4x4 transformation matrix
  * @param spacing distance between lines
  * @param divs number of grid divisions (rounds to odd value)
  */
function renderGrid (Tx, spacing, divs, context, color) {
  context.strokeStyle = color || 'rgba(255,255,255,.15)'
  context.beginPath()
  divs = divs % 2 === 0 ? divs + 1 : divs
  var length = spacing * (divs - 1)
  var posLength = length / 2
  var negLength = -length / 2
  // Draw from the middle out
  if (divs) {
    // x=0
    moveToTx([0, 0, negLength], Tx, context); lineToTx([0, 0, posLength], Tx, context)
    // z=0
    moveToTx([negLength, 0, 0], Tx, context); lineToTx([posLength, 0, 0], Tx, context)
  }
  for (var i = 1; i < divs / 2; i++) {
    // Positive offset
    // x=i*spacing
    moveToTx([i * spacing, 0, negLength], Tx, context); lineToTx([i * spacing, 0, posLength], Tx, context)
    // z=i*spacing
    moveToTx([negLength, 0, i * spacing], Tx, context); lineToTx([posLength, 0, i * spacing], Tx, context)
    // Negative offset
    // x=i*spacing
    moveToTx([-i * spacing, 0, negLength], Tx, context); lineToTx([-i * spacing, 0, posLength], Tx, context)
    // z=i*spacing
    moveToTx([negLength, 0, -i * spacing], Tx, context); lineToTx([posLength, 0, -i * spacing], Tx, context)
  }
  context.stroke()
}
