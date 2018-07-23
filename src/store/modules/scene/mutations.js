import * as Transform from '@/custom_modules/threads/transforms.js'
import {m4, v3} from 'twgl.js/dist/4.x/twgl-full'

export default {
  /**
   * Update is called every frame and causes
   * the animation.
   * @param {[type]} state   a.k.a. "scene"
   * @return {[type]} [description]
   */
  update (state) {
    // update spindle position to match active thread
    state.spindle.tx = state.threads[state.activeThread].tx
    state.spindle.position = state.threads[state.activeThread].position
    // Update camera
    let camera = state.camera
    let orbitalCamera = state.settings.orbitalCamera
    // spherical to cartesian conversion
    if (orbitalCamera) {
      camera.position[0] = camera.radius * Math.sin(camera.phi) * Math.cos(camera.theta)
      camera.position[2] = camera.radius * Math.sin(camera.phi) * Math.sin(camera.theta)
      camera.position[1] = camera.radius * Math.cos(camera.phi)
    }
    camera.target = state.spindle.position
    // Update each thread
    state.threads.forEach(function (thread) {
      let timeSinceLastCall = 1 / 60 // difference in time since last call TODO
      let dt = state.paused ? 0 : timeSinceLastCall // pause all motion
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
  },

  /**
   * Adds a point to the selected thread
   * @param {[type]} state   a.k.a. "scene"
   * @param {[type]} payload { x, y, (threadIndex)}
   */
  addPoint (state, payload) {
    let camera = state.camera
    let index = payload.threadIndex || state.activeThread
    let currentThread = state.threads[index]
    // Compute the camera projection viewport transform
    let Tcamera = Transform.cameraTx(camera.position, camera.target, camera.up)
    let Tprojection = m4.perspective(camera.fieldOfView, state.width / state.height, camera.zNear, camera.zFar)
    let Tviewport = Transform.viewportTx(state.width, state.height, true)
    let Tmodel = currentThread.tx
    let zNear = camera.zNear
    let zFar = camera.zFar
    let d = v3.distance(camera.position, currentThread.position)
    // For some insight into how the "clippedDepth" value is calculated
    // https://www.jwwalker.com/pages/depth_resolution.html
    let clippedDepth = 2 * ((zFar + zNear) / (2 * (zFar - zNear)) -
      zNear * zFar / (d * (zFar - zNear)) + 0.5) - 1
    let Tx = Transform.combine([Tviewport, Tprojection, Tcamera, Tmodel])
    let iTx = m4.inverse(Tx)
    let point = m4.transformPoint(iTx, [payload.x, payload.y, clippedDepth])
    currentThread.points.push(point)
  },

  /**
   * Sets the width and height of the scene
   * @param {[type]} state   [description]
   * @param {[type]} payload {width, height}
   */
  setSize (state, payload) {
    state.width = payload.width
    state.height = payload.height
  }
}
