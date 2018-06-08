/**
 * This file computes common transforms
 *
 * @author Eric Schirtzinger
 */

import * as twgl from 'twgl.js/dist/4.x/twgl-full'
export {
  combine,
  computeCameraTx
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
/**
 * Computes a camera transform given a
 * regularly formatted camera object
 * @param  {[type]} camera has feilds position, target and eye
 * @return {[type]} Tcamera, the camera transform
 */
function computeCameraTx (camera) {
  let TlookAt = m4.lookAt(camera.position, camera.target, camera.up)
  return m4.inverse(TlookAt)
}
