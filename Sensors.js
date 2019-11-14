//modulo function since % doesn't
//handle negative values
function mod(a, b) {
    return a - b * Math.floor(a / b);
}

function fireSensors() {
    //If the player has enhanced sensors
    //we setVisible to a radius of 5
    if (hasEnhancedSensors) {
        setVisible(5);
    } else {
    //Standard sensors: setVisible radius 2
        setVisible(2);
    }
    
    //Update the map to show new celestial points
    updateCelestialMap();

    //Decrease supplies by 2% and check them
    decrementSupplies(2);
    checkSupplies();
}


//setVisible takes in a radius to set visible around the player
//and if any point in the radius is non-visible then sets it to visible
//Handles bounds, and if wormholes are active each individual sensor
//gets teleported to a random area and if that spot is non-visible
//it gets set to visible.
function setVisible(radius) {
    for(var x = (player.position.x - radius) ; x <= (player.position.x + radius); x++) {
        for(var y = (player.position.y - radius); y <= (player.position.y + radius); y++) {
            if (isWormholeActive) {
                if (x < 0 || x > (map.bounds.x - 1)|| y < 0 || y > (map.bounds.y - 1)) {
                    //Sensor has flown into wormhole, gets randomly teleported

                    //Get some random coordinates on the grid
                    randomX = Math.floor(Math.random() * map.bounds.x);
                    randomY = Math.floor(Math.random() * map.bounds.y);
                    if (visible[randomX][randomY] === false) {
                        visible[randomX][randomY] = true;
                    }
                    continue;//Since we already checked a point continue so we don't do two points in 1 run
                }
            }
            //mod function to loop sensors around the map
            if (visible[mod(x, map.bounds.x)][mod(y, map.bounds.y)] === false) {
                visible[mod(x, map.bounds.x)][mod(y, map.bounds.y)] = true;
            }
        }
    }
}