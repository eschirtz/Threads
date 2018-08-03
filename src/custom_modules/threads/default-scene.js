export default function () {
  return {
    id: undefined,
    name: 'Untitled Scene',
    width: 0,
    height: 0,
    activeThread: 0,
    paused: false,
    settings: {
      rotationStepSize: 0.5,
      positionStepSize: 2,
      orbitStepSize: 5.0,
      orbitalCamera: true,
      buildMode: true
    },
    camera: {
      position: [0, 0, 0],
      radius: 250,
      theta: 1.57079,
      phi: 1.2,
      target: [0, 0, 0],
      up: [0, 1, 0],
      tx: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      fieldOfView: 0.57079,
      zNear: 50,
      zFar: 150
    },
    spindle: {
      isVisible: true,
      color: 'white',
      size: 10
    },
    grid: {
      isVisible: true,
      position: [0, 0, 0],
      divisions: 10,
      spacing: 10,
      color: 'rgba(255, 255, 255, 0.25)',
      tx: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    },
    threads: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        rotationSpeed: [0, 0, 0],
        color: 'white',
        points: [],
        tx: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      }
    ]
  }
}
