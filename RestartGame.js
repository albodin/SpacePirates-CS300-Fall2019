//resets all the values to their start values
function restart() {
    //TODO test restart function
    energy = startEnergy;
    document.getElementById("energy").value = startEnergy;
    supplies = startSupplies;
    document.getElementById("supplies").value = startSupplies;
    player.position.x = startx;
    document.getElementById("xVal").value = startx;
    player.position.y = startx;
    document.getElementById("yVal").value = starty;
    energyCost = 10;
    //reset visibility
    for(i= 0; i < map.bounds.x; ++i){
        for(j = 0; j < map.bounds.x; ++j){
            map.data[i][j] = {visible: false, artifact: null}
        }
    }
    //places artifacts
    placeArtifacts()
    celestialMap.onPlayerMovement(player)
}
