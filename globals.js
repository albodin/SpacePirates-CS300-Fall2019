//The global variables used for the game are placed here

// "Enums"
// Celestial Artifact Types
const CA__ASTEROID = 'Asteroid'
const CA__PLANET = 'Planet'
const CA__SPACE_STATION = 'Space Station'
const CA__ABANDONED_FREIGHTER = 'Abandoned Freighter'
const CA__MINI_MART = 'Mini Mart'
const CA__KOKA_KOLA = 'Koka Kola'
const CA__ENERGY_STATION = 'Musk-Tesla Energy Station'

var supplies = 0;
var energy = 0;
// TODO add to stuff
var credits = 0;
var isRegularPlay = true;
var hasEnhancedSensors = false;
var isWormholeActive = true; 
var gameOver = false;
// toggles the celestial gazetteer
var displayCelestial = false;

//start variables, what the game resets too upon losing
var startEnergy = 1000;
var startSupplies = 100;
// TODO
var startCredits = 80;
var startx = 12;
var starty = 12;
var energyCost = 10;//how much an energy one movement costs
var map = {
    bounds: {
        x: 126,
        y: 126
    },
}
// var previousPlayerPosition = {x:0,y:0}
//coordinates for artifact placement

try {
    var getArtifactCoords =  JSON.parse(localStorage.getItem('artifactCoords'));
} catch (error) {
    console.log('Artifact coords cant be read')
}

// suggestion - Matt
let player = {
    position: {x: 12, y: 12}
}

//Read settings from Local Storage
readSettingsFromLocalStorage()

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
