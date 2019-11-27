function showSaveSelection() {
    saveGame("TempName");
}

function saveGame(saveName) {
    var saveNameFull = "Save_" + saveName;
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key == saveNameFull) {
            if (!confirm("A save with the name '" + saveName + "' already exists. Would you like to overwrite it?")) {
                //User doesn't wish to save, return
                return;
            }
        }
    }
    var toStore = [];
    toStore.push(supplies);
    toStore.push(energy);
    toStore.push(isRegularPlay);
    toStore.push(hasEnhancedSensors);
    toStore.push(isWormholeActive);
    toStore.push(player);
    toStore.push(map);
    localStorage.setItem("Save_TempName", JSON.stringify(toStore));
}

function addLoadSelectOption(element, value, innerHTML) {
    var newOption = document.createElement('option');
    newOption.value = value;
    newOption.innerHTML = innerHTML;
    newOption.onclick = function() { loadGame(value); };
    element.appendChild(newOption);
}

function showLoadSelection() {
    //Find all required elements
    //var selectClass = document.getElementById("custom-select");
    var selectElement = document.getElementById("ourSelect");

    //Remove selection options so we can add new ones
    while (selectElement.firstChild) {
        selectElement.removeChild(selectElement.firstChild);
    }

    //Add default option
    addLoadSelectOption(selectElement, "Default", "Load Save")

    //Loop through localStorage and find saves of the game
    //and add them to the select options
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith("Save_")) {
            addLoadSelectOption(selectElement, key, key.replace("Save_", ""));
        }
    }
    
    //Set select to visible
    //selectClass.style.visibility = "visible";
    //selectClass.style.display = "block";
}

function hideLoadSelection() {
    var selectClass = document.getElementById("custom-select");
    selectClass.style.visibility = "hidden";
    selectClass.style.display = "none";
}

function loadGame(name) {
    //Don't try to load if default is pressed
    if (name !== "Default")
        loadSave(name);
    //hideLoadSelection();
}

function loadSave(saveName) {
    var toLoad = JSON.parse(localStorage.getItem(saveName));
    //Don't try and load if save doesn't exist or if it's the wrong size
    if (toLoad === null || toLoad.length != 7)
        return;
    supplies = toLoad[0];
    document.getElementById("supplies").value = supplies;
    energy = toLoad[1];
    document.getElementById("energy").value = energy;
    isRegularPlay = toLoad[2];
    hasEnhancedSensors = toLoad[3];
    isWormholeActive = toLoad[4];
    player = toLoad[5];
    map = toLoad[6];

    //Update the map and focus on player
    celestialMap.update();
    celestialMap.onPlayerMovement(player);
}