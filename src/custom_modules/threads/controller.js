/**
 * The controller binds user input
 * to application controlls, or scene modifications
 */
import * as ModScene from './modifiers.js'
export {
  initialize,
  executeTimerBasedControls
}
// Globals
let scene // hold a global reference to the current scene
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
 * this regularly formatted object contains
 * all the info required to map keboard controls
 * to game actions
 */
let keyboardActions = [
  {
    name: 'Camera Up',
    keycodeBindings: [
      ['87'] // 'w'
    ],
    badBindings: [
    ],
    action: ModScene.moveCamera,
    options: {
      thetaStep: 0.0,
      phiStep: -0.1
    }
  },
  {
    name: 'Camera Down',
    keycodeBindings: [
      ['83'] // 's'
    ],
    badBindings: [
    ],
    action: ModScene.moveCamera,
    options: {
      thetaStep: 0.0,
      phiStep: 0.1
    }
  },
  {
    name: 'Camera Right',
    keycodeBindings: [
      ['68'] // 'd'
    ],
    badBindings: [
    ],
    action: ModScene.moveCamera,
    options: {
      thetaStep: -0.1,
      phiStep: 0.0
    }
  },
  {
    name: 'Camera Left',
    keycodeBindings: [
      ['65'] // 'a'
    ],
    badBindings: [
    ],
    action: ModScene.moveCamera,
    options: {
      thetaStep: 0.1,
      phiStep: 0.0
    }
  },
  {
    name: 'Add Thread',
    keycodeBindings: [
      ['187'], // '+'
      ['67']
    ],
    badBindings: [
    ],
    action: ModScene.addThread,
    options: {
    }
  },
  {
    name: 'Move +x',
    keycodeBindings: [
      ['76'] // 'i'
    ],
    badBindings: [
    ],
    action: ModScene.moveSpindle,
    options: {
      direction: [1, 0, 0],
      stepSize: 0.5
    }
  },
  {
    name: 'Move -z',
    keycodeBindings: [
      ['74'] // 'j'
    ],
    badBindings: [
    ],
    action: ModScene.moveSpindle,
    options: {
      direction: [-1, 0, 0],
      stepSize: 0.5
    }
  },
  {
    name: 'Move +z',
    keycodeBindings: [
      ['75'] // 'k'
    ],
    badBindings: [
    ],
    action: ModScene.moveSpindle,
    options: {
      direction: [0, 0, 1],
      stepSize: 0.5
    }
  },
  {
    name: 'Move -z',
    keycodeBindings: [
      ['73'] // 'i'
    ],
    badBindings: [
    ],
    action: ModScene.moveSpindle,
    options: {
      direction: [0, 0, -1],
      stepSize: 0.5
    }
  },
  {
    name: 'Play / Pause',
    keycodeBindings: [
      ['32'] // 'Space'
    ],
    badBindings: [
    ],
    action: ModScene.playPause,
    options: {}
  },
  {
    name: 'Undo',
    keycodeBindings: [
      ['91', '90'], // 'command + z'
      ['17', '90'] // 'ctrl + z'
    ],
    badBindings: [
    ],
    action: ModScene.undoLastPoint,
    options: {numberOfPoints: 1}
  },
  {
    name: 'Increase y-rotation speed',
    keycodeBindings: [
      ['39'] // 'right arrow'
    ],
    badBindings: [
      ['16', '39'] // 'shift + right arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [0, 1, 0]}
  },
  {
    name: 'Decrease y-rotation speed',
    keycodeBindings: [
      ['37'] // 'left arrow'
    ],
    badBindings: [
      ['16', '37'] // 'shift + left arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [0, -1, 0]}
  },
  {
    name: 'Increase x-rotation speed',
    keycodeBindings: [
      ['38'] // 'up arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [-1, 0, 0]}
  },
  {
    name: 'Decrease x-rotation speed',
    keycodeBindings: [
      ['40'] // 'down arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [1, 0, 0]}
  },
  {
    name: 'Next Thread',
    keycodeBindings: [
      ['16', '39'] // 'shift + right arrow'
    ],
    action: ModScene.nextThread
  },
  {
    name: 'Previous Thread',
    keycodeBindings: [
      ['16', '37'] // 'shift + left arrow'
    ],
    action: ModScene.prevThread
  },
  {
    name: 'Toggle Build Mode',
    keycodeBindings: [
      ['72'] // 'h'
    ],
    action: ModScene.toggleBuildMode
  }
]

let keyMap = {}
onkeydown = onkeyup = function (e) {
  e = e || event // to deal with IE
  keyMap[e.keyCode] = e.type === 'keydown'
  // handle current key event on keyup
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
        let options = actionObject.options
        actionObject.action(scene, options)
      }
    })
  }
}

/**
 * Setup the controller
 * @param  {[type]} loadedScene scene data
 * @param  {[type]} canvas      canvas for canvas specific events
 * @return {[type]}             [description]
 */
function initialize (loadedScene, canvas) {
  scene = loadedScene
  addEventListeners(canvas)
  keyboardActions.forEach((actionObject) => {
    actionObject.options = actionObject.options || {}
  })
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
    ModScene.addPoint(scene, mouse.position.x, mouse.position.y)
  } else if (touch.down) {
    ModScene.addPoint(scene, touch.position.x, touch.position.y)
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

  if (mouse.position.x > scene.width ||
    mouse.position.y > scene.height ||
    mouse.position.x < 0 ||
    mouse.position.y < 0) {
    mouse.down = false // force mouse button up if mouse leaves screen
  }
}
