/**
 * Binds physical input devices to
 * state mutations.
 * @file
 */

import store from '@/store'
export {
  initialize,
  terminate,
  executeTimerBasedControls
}
// Globals
const mouse = {
  down: false,
  position: { x: 0, y: 0 }
}
const touch = {
  down: false,
  position: { x: 0, y: 0 }
}

/**
 * Keyboard controlls
 * this regularly formatted object contains all the info
 * required to map keboard controls to game actions
 */
const keyboardActions = [
  {
    name: 'Camera Up',
    keycodeBindings: [['87']],
    badBindings: [],
    action: 'scene/moveCamera',
    options: { phiStepSize: -0.1 }
  },
  {
    name: 'Camera Down',
    keycodeBindings: [['83']],
    badBindings: [],
    action: 'scene/moveCamera',
    options: { phiStepSize: 0.1 }
  },
  {
    name: 'Camera Right',
    keycodeBindings: [['68']],
    badBindings: [],
    action: 'scene/moveCamera',
    options: { thetaStepSize: -0.1 }
  },
  {
    name: 'Camera Left',
    keycodeBindings: [['65']],
    badBindings: [],
    action: 'scene/moveCamera',
    options: { thetaStepSize: 0.1 }
  },
  {
    name: 'Add Thread',
    keycodeBindings: [['187'], ['67']],
    badBindings: [],
    action: 'scene/addThread',
    options: {}
  },
  {
    name: 'Move +x',
    keycodeBindings: [ ['76'] ],
    badBindings: [],
    action: 'scene/updateThreadPosition',
    options: { direction: [1, 0, 0], stepSize: 1 }
  },
  {
    name: 'Move -z',
    keycodeBindings: [ ['74'] ],
    badBindings: [],
    action: 'scene/updateThreadPosition',
    options: { direction: [-1, 0, 0], stepSize: 1 }
  },
  {
    name: 'Move +z',
    keycodeBindings: [ ['75'] ],
    badBindings: [],
    action: 'scene/updateThreadPosition',
    options: { direction: [0, 0, 1], stepSize: 1 }
  },
  {
    name: 'Move -z',
    keycodeBindings: [ ['73'] ],
    badBindings: [],
    action: 'scene/updateThreadPosition',
    options: { direction: [0, 0, -1], stepSize: 1 }
  },
  {
    name: 'Play / Pause',
    keycodeBindings: [['32']],
    badBindings: [],
    action: 'scene/playPause',
    options: {}
  },
  {
    name: 'Undo',
    keycodeBindings: [['91', '90'], ['17', '90']],
    badBindings: [],
    action: 'scene/undo',
    options: {numberOfPoints: 1}
  },
  {
    name: 'Increase y-rotation speed',
    keycodeBindings: [ ['39'] ],
    badBindings: [ ['16', '39'] ],
    action: 'scene/updateThreadSpeed',
    options: {direction: [0, 1, 0]}
  },
  {
    name: 'Decrease y-rotation speed',
    keycodeBindings: [ ['37'] ],
    badBindings: [ ['16', '37'] ],
    action: 'scene/updateThreadSpeed',
    options: {direction: [0, -1, 0]}
  },
  {
    name: 'Increase x-rotation speed',
    keycodeBindings: [ ['38'] ],
    action: 'scene/updateThreadSpeed',
    options: {direction: [-1, 0, 0]}
  },
  {
    name: 'Decrease x-rotation speed',
    keycodeBindings: [ ['40'] ],
    action: 'scene/updateThreadSpeed',
    options: {direction: [1, 0, 0]}
  },
  {
    name: 'Next Thread',
    keycodeBindings: [['16', '39']],
    action: 'scene/nextThread'
  },
  {
    name: 'Previous Thread',
    keycodeBindings: [['16', '37']],
    action: 'scene/prevThread'
  },
  {
    name: 'Toggle Build Mode',
    keycodeBindings: [['72']],
    action: 'scene/toggleBuildMode'
  }
]

const keyMap = {}
/**
 * Event handler for keyboard controlls
 * @param  {[type]} e keyboard event
 */
onkeydown = onkeyup = function (e) {
  e = e || event // to deal with IE
  keyMap[e.keyCode] = e.type === 'keydown'
  // handle current key event on keydown
  if (e.type === 'keydown') {
    keyboardActions.forEach((actionObject) => {
      let takeAction = false
      // Check if there is a match with the key binding
      actionObject.keycodeBindings.forEach((binding) => {
        let bindingMatch = true
        for (let i = 0; i < binding.length; i++) {
          let keyCode = binding[i]
          if (keyMap[keyCode] === false ||
            keyMap[keyCode] === undefined) {
            bindingMatch = false
            break
          }
        }
        if (bindingMatch) {
          takeAction = true
        }
      })
      if (takeAction) {
        e.preventDefault() // if bound, prevent default
        // execute action
        let options = actionObject.options || {}
        store.commit(actionObject.action, options)
      }
    })
  }
}

/**
 * Setup the controller
 * @param  {[type]} canvas  canvas to bind listeners to
 */
function initialize (canvas) {
  addEventListeners(canvas)
}
/**
 * Tear down the controller
 * @param  {[type]} canvas canvas to undbind listeners from
 */
function terminate (canvas) {
  removeEventListeners(canvas)
}

/**
 * Attatches listeners
 * @param canvas
 */
function addEventListeners (canvas) {
  // Mouse & Touch Events
  canvas.addEventListener('touchstart', touchStartHandler)
  canvas.addEventListener('touchmove', touchMoveHandler)
  canvas.addEventListener('touchend', touchEndHandler)
  canvas.addEventListener('touchcancel', touchEndHandler)
  canvas.addEventListener('mousedown', mouseDownHandler)
  window.addEventListener('mousemove', getMousePosition)
  window.addEventListener('mouseup', mouseUpHandler)
  // Keyboard Controlls
  window.addEventListener('onkeydown', onkeydown)
  window.addEventListener('onkeyup', onkeyup)
}

/**
 * Detatches listeners
 * @param canvas
 */
function removeEventListeners (canvas) {
  // Mouse & Touch Events
  canvas.removeEventListener('touchstart', touchStartHandler)
  canvas.removeEventListener('touchmove', touchMoveHandler)
  canvas.removeEventListener('touchend', touchEndHandler)
  canvas.removeEventListener('touchcancel', touchEndHandler)
  canvas.removeEventListener('mousedown', mouseDownHandler)
  window.removeEventListener('mousemove', getMousePosition)
  window.removeEventListener('mouseup', mouseUpHandler)
  // Keyboard Controlls
  window.removeEventListener('onkeydown', onkeydown)
  window.removeEventListener('onkeyup', onkeyup)
}

/**
 * Light weight event handlers
 * Mouse and Touch
 */
function mouseDownHandler (event) {
  event.preventDefault()
  mouse.button = event.button
  mouse.down = true
}
function mouseUpHandler (event) {
  mouse.down = false
}
function touchStartHandler (event) {
  event.preventDefault()
  touch.down = true
  touch.position.x = event.touches[0].clientX
  touch.position.y = event.touches[0].clientY
}
function touchMoveHandler (event) {
  event.preventDefault()
  touch.position.x = event.touches[0].clientX
  touch.position.y = event.touches[0].clientY
}
function touchEndHandler (event) {
  touch.down = false
}
/**
 * The main application calls this function
 * every frame, can use to execute execute
 * based controls
 */
function executeTimerBasedControls () {
  let leftMouseButton = 0
  if (mouse.down && mouse.button === leftMouseButton) {
    store.commit('scene/addPoint', {x: mouse.position.x, y: mouse.position.y})
  } else if (touch.down) {
    store.commit('scene/addPoint', {x: touch.position.x, y: touch.position.y})
  }
}
/**
 * Tracks the current position of the mouse
 * for use in click in drag drawing
 */
function getMousePosition (event) {
  event.preventDefault()
  let eventDoc, doc, body
  event = event || window.event // IE-ism
  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  /* eslint-disable no-mixed-operators */
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document
    doc = eventDoc.documentElement
    body = eventDoc.body
    event.pageX = event.clientX +
        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
        (doc && doc.clientLeft || body && body.clientLeft || 0)
    event.pageY = event.clientY +
        (doc && doc.scrollTop || body && body.scrollTop || 0) -
        (doc && doc.clientTop || body && body.clientTop || 0)
  }
  /* eslint-enable no-mixed-operators */
  mouse.position.x = event.pageX
  mouse.position.y = event.pageY
  if (mouse.position.x > store.state.scene.width ||
    mouse.position.y > store.state.scene.height ||
    mouse.position.x < 0 ||
    mouse.position.y < 0) {
    mouse.down = false // force mouse button up if mouse leaves screen
  }
}
