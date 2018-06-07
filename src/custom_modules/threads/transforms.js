/**
 * This file computes common transforms
 *
 * @author Eric Schirtzinger
 */

// 4x4 matrix math functions
import * as twgl from 'twgl.js/dist/4.x/twgl-full'
var m4 = twgl.m4

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

export {combine}
