
function moveSpacecraft(angle, distance) {
    var distance = parseInt(document.getElementById("distance").value)

    movement(angle, distance)
    currentPosition()
    checkEnergy();
    checkSupplies();
    celestialMap.onPlayerMovement(player)

}

const getRandomInt = (max, min) => {
    return random = Math.floor(Math.random() * max + min)
}

const outOfBounds = (newPos) => {
    if (newPos > map.bounds.x || player.position.x < 0 || player.position.y > map.bounds.y || player.position.y < 0) {
        //if wormhole is active, redirect player to random position
        if (isWormholeActive) {
            player.position.x = getRandomInt(map.bounds.x, 0)
            player.position.x = getRandomInt(map.bounds.y, 0)
        }
        //If player goes out of bounds downwards, redirect X to 0
        if (player.position.x > map.bounds.x) {
            player.position.x = 0
        }
        //If player goes out of bounds upwards, redirect X to x boundry 
        if (player.position.x < 0) {
            player.position.x = map.bounds.x
        }
        //If player goes out of bounds righward, redirect y to 0
        if (player.position.y > map.bounds.y) {
            player.position.y = 0
        }
        //If player goes out of bounds leftward, redirect y to y boundry
        if (player.position.y < 0) {
            player.position.y = map.bounds.y
        }

    } else {
        return false
    }
}


function movement(angle, distance) {
    /*
       use: moves the spaceshipt based on input index.html
       */
    console.log(distance)
    distance = distance ? distance : 1;
    for (var i = 0; i < distance; ++i) {
        //  Up
        if (angle === 1) {
            if(player.position.y + i > map.bounds.y){
                player.position.y = 0
            }
            player.position.y++;
        }
        // Right
        else if (angle === 2) {
            if(player.position.x + i > map.bounds.x){
                player.position.x = 0
            }
            player.position.x++;
        }
        // Left
        else if (angle === 3) {
            if(player.position.y - i < 0){
                player.position.y = map.bounds.y
            }
            player.position.y--;
        }
        // Down
        else if (angle === 4) {
            if(player.position.x - i < 0){
                player.position.x = map.bounds.x
            }
            player.position.x--;
        }


        //update the Energy after a player makes a move
        decrementEnergy(energyCost);

        //Set the points to visible with a radius of 1 around the player
        setVisible(1);
        console.log(energy)
        console.log(player.position)
    }

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
