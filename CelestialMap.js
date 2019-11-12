// Grab DOM elements
const CANVAS = document.querySelector('#celestial-map')
const INFO = document.querySelector('#celestial-map-INFO')

// initial zoom
const ZOOM_DEFAULT = 50.0
// Minimum zoom, +3 accounts for border
let ZOOM_MIN = Math.max(
    CANVAS.width / (map.bounds.x + 3),
    CANVAS.height / (map.bounds.y + 3),
)
// Maximum zoom
const ZOOM_MAX = 100.0
const CAMERA_MIN = { x: -2, y: -2 }
const CAMERA_MAX = { x: map.bounds.x - 1, y: map.bounds.y - 1 }

// TODO: testing visibility
visible[14][13] = false
visible[13][13] = false
visible[11][15] = false


// Small utility functions
let util = {
    // Bounds a number between minimum and maximum value
    bound: (num, min, max) => {
        return num < min ?
            min : num > max ?
            max : num
    }
}


// Camera object represents where our view is in the world
let camera = {
    zoom: ZOOM_DEFAULT,
    position: {
        x: 7,
        y: 7,
    },
    bounds: {
        x: CANVAS.width,
        y: CANVAS.height,
    },
    // Clamps camera within it's bounds.
    clamp: () => {
        min = CAMERA_MIN
        // Changes based on zoom level.
        max = {
            x: CAMERA_MAX.x - (camera.bounds.x / camera.zoom) + 2,
            y: CAMERA_MAX.y - (camera.bounds.y / camera.zoom) + 2,
        }
        // Update position to remain within bounds.
        camera.position.x = util.bound(camera.position.x, min.x, max.x)
        camera.position.y = util.bound(camera.position.y, min.y, max.y)
    }
}

// Resizes the canvas and sets anything that needs to be updated to reflect
// the new canvas size.
function onResize() {
    console.log('here')
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
onResize()
window.addEventListener('resize', onResize)

// Transforms a world position into a camera position
function world_to_camera({x, y}) {
    x -= camera.position.x
    y -= camera.position.y
    x *= camera.zoom
    y *= camera.zoom
    return {x, y}
}

// Transforms a camera position into a world position
function camera_to_world({x, y}) {
    x /= camera.zoom
    y /= camera.zoom
    x += camera.position.x
    y += camera.position.y
    return {x, y}
}

// Allows for dragging for map movement
CANVAS.onmousedown = (e) => {
    // Track position
    let last_position = { x: e.pageX, y: e.pageY }
    let onMouseMove = (e) => {
        // Get delta position
        let delta = {
            x: last_position.x - e.pageX,
            y: last_position.y - e.pageY,
        }
        camera.position.x += delta.x / camera.zoom
        camera.position.y += delta.y / camera.zoom
        camera.clamp()
        last_position = {x: e.pageX, y: e.pageY}
    }
    let onMouseUp = (_e) => {
        // Destroy this function, ending drag behavior
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', this)
        // Ignore default event behavior
        return false
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    // Ignore default event behavior
    return false
}

let mouse = {position: {x: 0, y: 0}}
CANVAS.addEventListener('mousemove', (e) => {
    let canvasRect = CANVAS.getBoundingClientRect()
    mouse.position = camera_to_world({
        x: e.pageX - canvasRect.left,
        y: e.pageY - canvasRect.top,
    })
    return false
})

// Implements scrolling behavior on Celestial Map
CANVAS.addEventListener('wheel', (e) => {
    e.preventDefault()
    let oldZoom = camera.zoom
    camera.zoom -= e.deltaY
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
    camera.clamp()
})

let LINEWIDTH = 1
let CLOSE_COLOR = '#828239'

let onRedraw = () => {
    let redraw = () => {
        let ctx = CANVAS.getContext('2d')
        let { width, height } = CANVAS
        let lineWidth = 0.04 * camera.zoom

        ctx.lineWidth = lineWidth
        ctx.clearRect(0,0,width,height)
        drawBorders()
        drawMap()
        drawPlayer()
        // writeInfo()
        onRedraw()

        // Debug by printing to DOM in real time
        function writeInfo() {
            INFO.innerHTML = `CAMERA: ${JSON.stringify(camera)}<br/>` +
                `MOUSE: ${JSON.stringify(mouse)}`
        }

        // Draws the map borders
        function drawBorders() {
            // Draw borders
            ctx.strokeStyle = '#aaa'
            let ul_corner = world_to_camera({x: -1, y: -1})
            let br_corner = world_to_camera({x: map.bounds.x, y: map.bounds.y})
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
            return (x > -camera.zoom && x < width &&
                    y > -camera.zoom && y < height)
        }

        // Draws the player ship
        function drawPlayer() {
            let { x, y } = world_to_camera(player.position)
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
                    let screenPos = world_to_camera({x, y})
                    let size = 0.04
                    if (!withinCameraBounds(screenPos)) continue
                    // "checkerboard" larger and smaller stars
                    if (x % 2 == 1 && y % 2 == 0 ||
                        x % 2 == 0 && y % 2 == 1)
                        size = 0.03
                    ctx.beginPath()
                    ctx.arc(screenPos.x, screenPos.y, size * camera.zoom, 0, 2 * Math.PI)
                    ctx.fill();
                }
            }
        }
    }
    // TODO don't call itself, only call when needs to update
    requestAnimationFrame(redraw)
}

// call this on move event
onRedraw()
