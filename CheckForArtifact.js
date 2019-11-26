//Checks if you are in the same space as an artifact, if you are it does something special and returns true.
function checkForArtifact(){
    if(!map.data[player.position.x][player.position.y].artifact)
        return false;

    var tile = map.data[player.position.x][player.position.y].artifact.type;

    //there is a celestial object in our space
    if (tile) {
        switch (tile) {
            case CA__ASTEROID:
                // TODO Implement
                return true;
            case CA__PLANET:
                // TODO Implement
                return true;
            case CA__SPACE_STATION:
                // TODO Implement
                return true;
            case CA__ABANDONED_FREIGHTER:
                // TODO Implement
                return true;
            case CA__MINI_MART:
                // TODO Implement
                return true;
            case CA__KOKA_KOLA:
                winGame();
                return true;
        }
    }

}