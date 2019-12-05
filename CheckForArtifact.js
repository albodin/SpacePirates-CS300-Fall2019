//Checks if you are in the same space as an artifact, if you are it does something special and returns true.
function checkForArtifact(){
    if(!map.data[player.position.x][player.position.y].artifact)
        return false;

    var location = map.data[player.position.x][player.position.y]
    var tile = map.data[player.position.x][player.position.y].artifact;

    //there is a celestial object in our space
    if (tile && tile.type) {
        decrementSupplies(2);
        if(!checkSupplies()) {
            gameOver = true;
            return true;
        }
        switch (tile.type) {
            case CA__ASTEROID:
                makeModalMenu('Collided with an asteroid!')
                return true;
            case CA__PLANET:
                planet(tile);
                return true;
            case CA__SPACE_STATION:
                spaceStation()
                return true;
            case CA__ENERGY_STATION:
                energyStation()
                return true;
            case CA__ABANDONED_FREIGHTER:
                abandonedFreighter(location)
                return true;
            case CA__MINI_MART:
                miniMart()
                return true;
            case CA__KOKA_KOLA:
                winGame();
                return true;
        }
    }
}

