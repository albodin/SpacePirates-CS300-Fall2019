//The global variables used for the game are placed here

// Enums
const ASTEROID = 'asteroid'
const PLANET = 'planet'
const SPACE_STATION = 'spaceStation'
const ABANDONED_FREIGHTER = 'abandonedFreighter'

var supplies = 0;
var energy = 0;
var isRegularPlay = true;
var hasEnhancedSensors = false;
var isWormholeActive = true; 

//start variables, what the game resets too upon losing
var startEnergy = 1000;
var startSupplies = 100;
var startx = 12;
var starty = 12;
var energyCost = 10;//how much an energy one movement costs
var map = {
    bounds: {
        x: 126,
        y: 126
    },
}

// suggestion - Matt
let player = {
    position: {x: 12, y: 12}
}

// Initializes the entire map grid to a default object.
map.data = Array(map.bounds.x)
    .fill().map(() => Array(map.bounds.y)
    .fill().map(() => {
        // Default map object
        return {
            visible: false,
            artifact: null
        }
    }))

function placeArtifacts() {
    // fills map with some artifacts
    map.data[0][0].artifact = { type: ASTEROID }
    map.data[3][3].artifact = { type: PLANET }
    map.data[2][2].artifact = { type: SPACE_STATION }
    map.data[16][16] = {
        visible: true,
        artifact: {
            type: PLANET,
            name: 'Celeron',
            color: '#994433',
        }
    }
    map.data[2][4] = {
        visible: true,
        artifact: {
            type: PLANET,
            name: 'Xeon',
            color: '#449933',
        }
    }
    map.data[2][6] = {
        visible: true,
        artifact: {
            type: PLANET,
            name: 'Ryzen',
            color: '#999922',
        }
    }
}
