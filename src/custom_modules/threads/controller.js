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
    name: 'Increase y-rotation speed',
    bindings: [
      ['39'] // 'right arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [0, 1, 0]}
  },
  {
    name: 'Decrease y-rotation speed',
    bindings: [
      ['37'] // 'left arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [0, -1, 0]}
  },
  {
    name: 'Increase x-rotation speed',
    bindings: [
      ['38'] // 'up arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [1, 0, 0]}
  },
  {
    name: 'Decrease x-rotation speed',
    bindings: [
      ['40'] // 'down arrow'
    ],
    action: ModScene.updateThreadSpeed,
    options: {direction: [-1, 0, 0]}
  },
  {
    name: 'Next Thread',
    bindings: [
      ['16', '39'] // 'shift + right arrow'
    ],
    action: ModScene.nextThread
  },
  {
    name: 'Previous Thread',
    bindings: [
      ['16', '37'] // 'shift + left arrow'
    ],
    action: ModScene.prevThread
  }
]

let keyMap = {}
onkeydown = onkeyup = function (e) {
  e = e || event // to deal with IE
  keyMap[e.keyCode] = e.type === 'keydown'
  // handle current key event on keyup
  if (e.type === 'keydown') {
    keyboardActions.forEach((actionObject, i) => {
      let takeAction = false
      actionObject.bindings.forEach((binding, i) => {
        let bindingMatch = true
        binding.forEach(keyCode => {
          if (keyMap[keyCode] === false ||
            keyMap[keyCode] === undefined) {
            bindingMatch = false
          }
        })
        if (bindingMatch) {
          takeAction = true
        }
      })
      if (takeAction) {
        let options = actionObject.options
        actionObject.action(scene, options)
        console.log(actionObject.name)
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
  // update keybindings TODO make less janky
  let stepSize = scene.settings.stepSize
  keyboardActions.forEach((actionObject) => {
    actionObject.options = actionObject.options || {}
    actionObject.options.stepSize = stepSize
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
  if (mouse.down) {
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
