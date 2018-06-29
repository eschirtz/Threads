/**
 * This file computes common transforms
 *
 * @author Eric Schirtzinger
 */

import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  combine,
  cameraTx,
  viewportTx
}
const m4 = twgl.m4

/**
 * Combines multiple transforms by multiplying
 * from the front of the array to the back
 * @param  {[type]} Txs array of transforms to combine
 * @return {[type]} Tx  the result of the combination
 */
function combine (Txs) {
  if (Txs.length < 1) return undefined
  if (Txs.length === 1) return Txs[0]
  let Tx // final transform to return
  Tx = Txs[0]
  for (let i = 1; i < Txs.length; i++) {
    Tx = m4.multiply(Tx, Txs[i])
  }
  return Tx
}

function cameraTx (eye, target, up) {
  return m4.inverse(m4.lookAt(
    eye,
    target,
    up
  ))
}

/**
 * Computes a viewport transform
 * @param  {[type]}  width        width of the viewport
 * @param  {[type]}  height       height of the viewport
 * @param  {Boolean} isNormalized true if coordinates are -1 to 1
 */
function viewportTx (width, height, isNormalized) {
  let Txtrans = m4.translation([width / 2, height / 2, 0])
  let Txscaling = isNormalized
    ? m4.scaling([width / 2, -height / 2, 1])
    : m4.scaling([1, -1, 1])
  return combine([Txtrans, Txscaling])
}
