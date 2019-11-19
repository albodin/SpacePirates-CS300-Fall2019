// Grab DOM elements
const CANVAS = document.querySelector('#celestial-map')
const INFO = document.querySelector('#celestial-map-INFO')

// initial zoom
const ZOOM_DEFAULT = 50.0
// Minimum zoom, +3 accounts for border around map and feels a little nicer
let ZOOM_MIN = Math.max(
    CANVAS.width / (map.bounds.x + 3),
    CANVAS.height / (map.bounds.y + 3),
)
// Maximum zoom
const ZOOM_MAX = 100.0
const CAMERA_MIN = { x: -2, y: -2 }
const CAMERA_MAX = { x: map.bounds.x - 1, y: map.bounds.y - 1 }

// Small utility functions
let util = {
    // Bounds a number between minimum and maximum value
    bound: (num, min, max) => { return num < min ?  min : num > max ?  max : num },
    // Adds "vector2 math" for dealing with {x, y} objects as vectors
    // Always return a new vector.
    vector2math: {
        mul(v1, v2) {
            v1 = this.validate(v1); v2 = this.validate(v2)
            return { x: v1.x * v2.x, y: v1.y * v2.y }
        },
        div(v1, v2) {
            v1 = this.validate(v1); v2 = this.validate(v2)
            return { x: v1.x / v2.x, y: v1.y / v2.y }
        },
        add(v1, v2) {
            v1 = this.validate(v1); v2 = this.validate(v2)
            return { x: v1.x + v2.x, y: v1.y + v2.y }
        },
        sub(v1, v2) {
            v1 = this.validate(v1); v2 = this.validate(v2)
            return { x: v1.x - v2.x, y: v1.y - v2.y }
        },
        validate(v) {
            if (typeof v === 'object' &&
                v.hasOwnProperty('x') &&
                v.hasOwnProperty('y'))
                return v;
            if (typeof v === 'number')
                return {x: v, y: v};
            throw new Error('v must be a number or an object {x, y}')
        }
    }
}

// Resizes the canvas and sets anything that needs to be updated to reflect
// the new canvas size.
function onResize() {
    let parent = document.querySelector('#celestial-map-container')
    CANVAS.width = parent.clientWidth
    CANVAS.height = parent.clientHeight
    ZOOM_MIN = Math.max(
        CANVAS.width / (map.bounds.x + 3),
        CANVAS.height / (map.bounds.y + 3),
    )
    camera.bounds = {
        x: CANVAS.width,
        y: CANVAS.height,
    }
}
window.addEventListener('resize', onResize)
onResize()


// Camera object represents where our view is in the world
let camera = {
    zoom: ZOOM_DEFAULT,
    zoomBy(delta) {
        // Update current zoom, keep old value
        let oldZoom = camera.zoom
        camera.zoom -= delta
        camera.zoom = util.bound(camera.zoom, ZOOM_MIN, ZOOM_MAX)
        // Update camera position to 'zoom in' on mouse position
        // Get difference in zoom between this and last
        let zoomDelta = camera.zoom - oldZoom
        // Get difference between camera position and mouse position
        let zoomOffset = {
            x: mouse.position.x - camera.position.x,
            y: mouse.position.y - camera.position.y,
        }
        // Do the math (honestly this was a bit of trial and error)
        camera.position.x += (zoomOffset.x * zoomDelta) / camera.zoom
        camera.position.y += (zoomOffset.y * zoomDelta) / camera.zoom
        // Clamp view to boundaries
        camera.clamp()
        // Update mouse with new world position
        mouse.updatePosition()
        // Trigger repaint
        celestialMap.update()
    },
    position: { x: 7, y: 7 },
    bounds: {
        x: CANVAS.width,
        y: CANVAS.height,
    },
    // Clamps camera within it's bounds.
    clamp: () => {
        let v = util.vector2math
        let min = CAMERA_MIN
        // Changes based on zoom level.
        let max = v.add(
            v.sub(
                CAMERA_MAX,
                v.div(camera.bounds, camera.zoom)
            ), 2)
        // Update position to remain within bounds.
        camera.position.x = util.bound(camera.position.x, min.x, max.x)
        camera.position.y = util.bound(camera.position.y, min.y, max.y)
    },
    get_center() {
        return camera.transform.camera_to_world(
            util.vector2math.div(camera.bounds, 2))
    },
    centerOn({x, y}) {
        playerPos = camera.transform.world_to_camera({x, y})
        pos = {
            x: playerPos.x - (camera.bounds.x / 2),
            y: playerPos.y - (camera.bounds.y / 2)
        }
        camera.position = camera.transform.camera_to_world(pos)
        camera.clamp()
        celestialMap.update()
    },
    transform: {
        world_to_camera({x, y}) {
            let { zoom, position } = camera;
            return {
                x: (x - position.x) * zoom,
                y: (y - position.y) * zoom,
            }
        },
        camera_to_world({x, y}) {
            let { zoom, position } = camera;
            return {
                x: (x / zoom) + position.x,
                y: (y / zoom) + position.y
            }
        }
    },
    init() {
        this.centerOn(player.position)
    }
}
camera.init()

let mouse = {
    position: {x: 0, y: 0},
    screenPosition: {x: 0, y: 0},
    updatePosition() {
        this.position = camera.transform
            .camera_to_world(this.screenPosition)
    },
    // Updates this fake mouse object on real mouse movement
    onMove(e) {
        // Ignore default event behavior
        e.preventDefault()
        // Get canvas location
        let canvasRect = CANVAS.getBoundingClientRect()
        // Get mouse location relative to canvas
        this.screenPosition = {
            x: e.pageX - canvasRect.left - window.scrollX,
            y: e.pageY - canvasRect.top - window.scrollY,
        }
        // Update world position
        this.updatePosition()
        // Trigger paint
        celestialMap.update()
    },
    // Implements scrollwheel behavior on Celestial Map
    onWheel(e) {
        e.preventDefault()
        camera.zoomBy(e.deltaY)
    },
    // Starts dragging. TODO click functionality?
    onDown(e) {
        let v = util.vector2math
        // Track position
        let lastPosition = { x: e.pageX, y: e.pageY }
        let onDrag = (e) => {
            // Ignore default event behavior
            e.preventDefault()
            // Get delta position (difference between this frame and last)
            let currentPosition = {x: e.pageX, y: e.pageY}
            let delta = v.sub(lastPosition, currentPosition)
            // Move camera appropriately
            camera.position = v.add(camera.position, v.div(delta, camera.zoom))
            // Clamp camera to boundaries
            camera.clamp()
            // Update lastPosition
            lastPosition = currentPosition
            // Trigger repaint
            celestialMap.update()
        }
        let endDrag = (_e) => {
            // Destroy this function, ending drag behavior
            document.removeEventListener('mousemove', onDrag)
            document.removeEventListener('mouseup', this)
            // Ignore default event behavior
            return false
        }
        // Listen for mouse movement to 'drag', mouseup for signal to stop.
        document.addEventListener('mousemove', onDrag)
        document.addEventListener('mouseup', endDrag)
        // Trigger repaint
        celestialMap.update()
    },
    init() {
        CANVAS.addEventListener('mousemove', (e) => this.onMove(e))
        CANVAS.addEventListener('wheel', (e) => this.onWheel(e))
        CANVAS.addEventListener('mousedown', (e) => this.onDown(e))
    }
}
mouse.init()

let LINEWIDTH = 1
let CLOSE_COLOR = '#828239'

let celestialMap = {
    onPlayerMovement(player) {
        camera.centerOn(player.position)
    },
    update() {
        let redraw = () => {
            let ctx = CANVAS.getContext('2d')
            let { width, height } = CANVAS
            let lineWidth = 0.04 * camera.zoom
            ctx.lineWidth = lineWidth
            ctx.clearRect(0,0,width,height)
            drawBorders()
            drawMap()
            drawPlayer()
            writeInfo()

            // Debug by printing to DOM in real time
            function writeInfo() {
                INFO.innerHTML = `CAMERA: ${JSON.stringify(camera)}<br/>` +
                    `MOUSE: ${JSON.stringify(mouse)}`
            }

            // Draws the map borders
            function drawBorders() {
                // Draw borders
                ctx.strokeStyle = '#aaa'
                let ul_corner = camera.transform.world_to_camera({x: -1, y: -1})
                let br_corner = camera.transform.world_to_camera(map.bounds)
                ctx.beginPath()
                ctx.moveTo(ul_corner.x, ul_corner.y)
                ctx.lineTo(br_corner.x, ul_corner.y)
                ctx.lineTo(br_corner.x, br_corner.y)
                ctx.lineTo(ul_corner.x, br_corner.y)
                ctx.lineTo(ul_corner.x, ul_corner.y)
                ctx.stroke()
            }

            // Takes a *screen* {x, y}, returns whether or not the camera can see it.
            function withinCameraBounds({x, y}) {
                return (x > -camera.zoom && x < width && y > -camera.zoom && y < height)
            }

            // Draws the player ship
            function drawPlayer() {
                let { x, y } = camera.transform.world_to_camera(player.position)
                let cockpitSize = 0.3
                let shipSize = 0.6
                // ship
                ctx.strokeStyle = "#470c05"
                ctx.fillStyle = "#8a1f12"
                // outline
                ctx.beginPath()
                ctx.arc(x, y, shipSize * camera.zoom, 0, 2 * Math.PI)
                ctx.fill()
                // fill
                ctx.beginPath()
                ctx.arc(x, y, shipSize * camera.zoom, 0, 2 * Math.PI)
                ctx.stroke()
                // inner line
                ctx.beginPath()
                ctx.arc(x, y, (cockpitSize * camera.zoom) + lineWidth, 0, 2 * Math.PI)
                ctx.stroke()
                // cockpit
                ctx.strokeStyle = "#5e65b8"
                ctx.fillStyle = "#a8aeed"
                ctx.beginPath()
                ctx.arc(x, y, cockpitSize * camera.zoom, 0, 2 * Math.PI)
                ctx.fill()
                ctx.beginPath()
                ctx.arc(x, y, cockpitSize * camera.zoom, 0, 2 * Math.PI)
                ctx.stroke()
            }

            // Draws the map, respects visibility
            function drawMap() {
                ctx.fillStyle = "#fcf4dc"
                for (let x = 0; x < map.bounds.x; x += 1) {
                    for (let y = 0; y < map.bounds.y; y += 1) {
                        if (!visible[x][y])
                            continue;
                        let screenPos = camera.transform.world_to_camera({x, y})
                        let size = 0.04
                        if (!withinCameraBounds(screenPos)) continue
                        // "checkerboard" larger and smaller stars
                        if (x % 2 == 1 && y % 2 == 0 || x % 2 == 0 && y % 2 == 1)
                            size = 0.02
                        ctx.beginPath()
                        ctx.arc(
                            screenPos.x,
                            screenPos.y,
                            size * camera.zoom, 0, 2 * Math.PI)
                        ctx.fill();
                    }
                }
            }
        }
        requestAnimationFrame(redraw)
    }
}

// call this on move event
celestialMap.update()
