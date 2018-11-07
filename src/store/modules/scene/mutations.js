import * as Transform from '@/custom_modules/threads/transforms.js'
import {m4, v3} from 'twgl.js/dist/4.x/twgl-full'

export default {
  /**
   * Update is called every frame and causes
   * the animation.
   * @param {[type]} state   a.k.a. "scene"
   * @return {[type]} [description]
   */
  update (state, dt) {
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
      dt = state.paused ? 0 : dt // pause all motion
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

  nullTerminateThread (state, payload) {
    payload = payload || {}
    let index = payload.threadIndex || state.activeThread
    let currentThread = state.threads[index]
    currentThread.points.push(false) // mark with null terminator
  },

  /**
   * Rotate selected thread
   * @param  {[type]} state
   * @param  {[type]} options {direction, stepSize, threadIndex}
   */
  updateThreadSpeed (state, options) {
    options = options || {}
    let stepSize = options.stepSize || state.settings.rotationStepSize
    let direction = options.direction || [0, 0, 0]
    let threadIndex = options.threadIndex || state.activeThread
    let rotationSpeed = state.threads[threadIndex].rotationSpeed
    for (let i = 0; i < direction.length; i++) {
      rotationSpeed[i] += direction[i] * stepSize
    }
  },
  /**
   * Move selected thread around
   * @param  {[type]} state
   * @param  {[type]} options {direction, stepSize, threadIndex}
   */
  updateThreadPosition (state, options) {
    options = options || {}
    let stepSize = options.stepSize || state.settings.positionStepSize
    let direction = options.direction || [0, 0, 0]
    let threadIndex = options.threadIndex || state.activeThread
    let position = state.threads[threadIndex].position
    for (let i = 0; i < direction.length; i++) {
      position[i] += direction[i] * stepSize
    }
  },
  /**
   * Move / orbit camera
   * @param  {[type]} scene
   * @param  {[type]} options {thetaStepSize, phiStepSize}
   */
  moveCamera (state, options) {
    options = options || {}
    let thetaStep = options.thetaStepSize || 0
    let phiStep = options.phiStepSize || 0
    state.camera.theta = (state.camera.theta + thetaStep) % (2 * Math.PI)
    state.camera.phi = state.camera.phi + phiStep
    // Restrict camera position, TODO clean up magic numbers
    state.camera.phi = state.camera.phi > Math.PI - 0.1 ? Math.PI - 0.1 : state.camera.phi
    state.camera.phi = state.camera.phi < 0 ? 0.01 : state.camera.phi
  },
  prevThread (state) {
    let current = state.activeThread
    current = current - 1 >= 0
      ? current - 1
      : current
    state.activeThread = current
  },
  nextThread (state) {
    let length = state.threads.length
    let current = state.activeThread
    current = current + 1 < length
      ? current + 1
      : current
    state.activeThread = current
  },
  addThread (state) {
    let hue = Math.random() * 360 // scale 0 - 360 for hue
    let color = 'hsl(' + hue + ', 100%, 50%)'
    let newThread = {
      'position': [0, 0, 0],
      'rotation': [0, 0, 0],
      'rotationSpeed': [0, 0, 0],
      'color': color,
      'points': [false],
      'tx': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    }
    state.threads.push(newThread)
    state.activeThread = state.threads.length - 1
  },
  /**
   * Sets the width and height of the scene
   * @param {[type]} state   [description]
   * @param {[type]} payload {width, height}
   */
  setSize (state, payload) {
    state.width = payload.width
    state.height = payload.height
  },
  toggleBuildMode (state) {
    state.settings.buildMode = !state.settings.buildMode
    state.grid.isVisible = !state.grid.isVisible
    state.spindle.isVisible = !state.spindle.isVisible
  },
  playPause (state, options) {
    options = options || {}
    state.paused = options.paused || !state.paused
  },
  undo (state, options) {
    // options = options || {}
    // let numPoints = options.numberOfPoints || 1
    const threadIndex = options.threadIndex || state.activeThread
    const points = state.threads[threadIndex].points
    points.pop() // remove the ending terminator
    while (points[points.length - 1]) {
      points.pop()
    }
  },
  setName (state, payload) {
    state.name = payload
  },
  setCreatorId (state, id) {
    state.creatorId = id
  },
  setId (state, payload) {
    state.id = payload
  },
  setThreadColor (state, payload) {
    state.threads[payload.threadIndex].color = payload.color
  }
}
