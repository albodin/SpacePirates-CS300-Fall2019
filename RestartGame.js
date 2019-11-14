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
}
