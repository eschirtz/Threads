/**
 * The controller binds user input
 * to application controlls, or scene modifications
 */
import * as ModScene from './modifiers.js'
export {
  initialize,
  executeTimerBasedControls
}
let settings = {
  bindings: {
    addPoint: ['mousedown.left']
  }
}
let scene
const mouse = {
  down: false,
  position: {
    x: 0,
    y: 0
  }
}

function initialize (loadedScene, canvas) {
  console.log('Initializing controller')
  scene = loadedScene
  addEventListeners(settings, canvas)
}

function addEventListeners (settings, canvas) {
  window.addEventListener('mousemove', getMousePosition)
  canvas.addEventListener('mousedown', mouseDownHandler)
  window.addEventListener('mouseup', mouseUpHandler)
}

/**
 * The main application calls this function
 * every frame, can use to execute execute
 * based controls
 */
function executeTimerBasedControls () {
  if (mouse.down) {
    ModScene.addPoint(scene, mouse.position.x, mouse.position.y)
  }
}

function mouseDownHandler (event) {
  event.preventDefault()
  mouse.button = event.button
  mouse.down = true
}

function mouseUpHandler (event) {
  mouse.down = false
}

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
