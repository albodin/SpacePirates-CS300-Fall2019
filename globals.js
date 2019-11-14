//The global variables used for the game are placed here

var supplies = 0;
var energy = 0;
var shipLocation = {x: 0, y: 0};
var isRegularPlay = 0;

//start variables, what the game resets too upon losing
var startEnergy = 100;
var startSupplies = 100;
var startx = 12;
var starty = 12;

var map = {
    bounds: {
        x: 126,
        y: 126
    }
};
// suggestion - Matt
let player = {
    position: {x: 12, y: 12}
}

// Initializes the entire map grid's visibility information to false.
// should this go somewhere else?
// TODO initialize to false instead of true once visibility actually works
let visible = Array(map.bounds.x).fill().map(() => Array(map.bounds.y).fill(true))
