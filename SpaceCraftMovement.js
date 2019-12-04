
function moveSpacecraft(angle, distance) {
    var distance = parseInt(document.getElementById("distance").value)

    movement(angle, distance)
    currentPosition()
    checkEnergy();
    checkSupplies();
    celestialMap.onPlayerMovement(player)

}

// Gets random int, used for wormhole
const getRandomInt = (max, min) => {
    return random = Math.floor(Math.random() * max + min)
}



const checkWormHole = () => {
    if (isWormholeActive) {
        player.position.x = getRandomInt(map.bounds.x, 0)
        player.position.x = getRandomInt(map.bounds.y, 0)
    } else {
        return false
    }
}


function movement(angle, distance) {
    /*
       use: moves the spaceshipt based on input index.html
       */
    //console.log(distance)
    distance = distance ? distance : 1;
    for (var i = 0; i < distance; ++i) {
        previousPlayerPosition = {
            x: player.position.x,
            y: player.position.y,
        }
        //  Down
        if (angle === 1) {
            if (player.position.y + 1 >= map.bounds.y) {
                if (isWormholeActive) {
                    player.position.x = getRandomInt(map.bounds.x, 0)
                    player.position.y = getRandomInt(map.bounds.y, 0)
                } else {
                    player.position.y = 0
                }
            } else {
                player.position.y++;
            }
        }
        // Right
        else if (angle === 2) {
            if (player.position.x + 1 >= map.bounds.x) {
                if (isWormholeActive) {
                    player.position.x = getRandomInt(map.bounds.x, 0)
                    player.position.y = getRandomInt(map.bounds.y, 0)
                } else {
                    player.position.x = 0
                }
            } else {
                player.position.x++;
            }
        }
        // Up
        else if (angle === 3) {
            if (player.position.y - 1 < 0) {
                if (isWormholeActive) {
                    player.position.x = getRandomInt(map.bounds.x, 0)
                    player.position.y = getRandomInt(map.bounds.y, 0)
                } else {
                    player.position.y = map.bounds.y - 1;
                }
            } else {
                player.position.y--;
            }
        }
        // Left
        else if (angle === 4) {
            if (player.position.x - 1 < 0) {
                if (isWormholeActive) {
                    player.position.x = getRandomInt(map.bounds.x, 0)
                    player.position.y = getRandomInt(map.bounds.y, 0)
                } else {
                    player.position.x = map.bounds.x - 1;
                }
            } else {
                player.position.x--;
            }
        }

        //check to see if you ran into an artifact, if you did, the movement loop will stop and
        //this statement will be true.
        if(checkForArtifact())
        {
            //you won the game, do not decrement the supplies
            if(gameOver){
                gameOver = false;
                return;
            }

            //you hit an artifact that wasn't koka-kola, stop moving and decrement supplies.
            else{
                player.position = previousPlayerPosition
                decrementSupplies(2);
                // console.log(energy)
                // console.log(player.position)
                return;
            }
        }


        //update the Energy after a player makes a move
        decrementEnergy(energyCost);  
        //Set the points to visible with a radius of 1 around the player
        setVisible(1)

        // console.log(energy)
        // console.log(player.position)
    }
    decrementSupplies(2);
};


let currentPosition = () => {
    //update x 
    document.getElementById("xVal").value = player.position.x
    //update y 
    document.getElementById("yVal").value = player.position.y
}

function modifyMapPositionFromInput() {
    player.position.x = parseInt(document.getElementById("xVal").value)
    player.position.y = parseInt(document.getElementById("yVal").value)
}
