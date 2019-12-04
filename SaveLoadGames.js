//If the enter key is detected we assume that the user has
//finished typing their save name, so we try to save the game
//and hide the input box
function saveTextKeyPress(event, value) {
    if (event.key === "Enter") {
        if (value !== "")
            saveGame(value);
        var save_input = document.getElementById("custom-input");
        save_input.style.visibility = "hidden";
        save_input.style.display = "none";
    }
}

//Sets the save input to visible and resets the value in it
function showSaveInput() {
    var save_input = document.getElementById("custom-input");
    var save_text = document.getElementById("saveText");

    save_input.style.visibility = "visible";
    save_input.style.display = "block";

    save_text.value = "";
}

//Tries to save the game with the passed in name, saving is canceled in the case
//that a save with the same name exists and the user doesn't wish to overwrite.
//And if the localStorage is full and the user doesn't wish to delete a save or
//no save is found to delete saving is also canceled.
function saveGame(saveName) {
    //Loop through the localStorage and see if a save already exists with the same
    //name, and if it does ask the user if they wish to overwrite it
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

    //We create a new array and push what we wish to save
    var toStore = [];
    toStore.push(supplies);
    toStore.push(energy);
    toStore.push(isRegularPlay);
    toStore.push(hasEnhancedSensors);
    toStore.push(isWormholeActive);
    toStore.push(player);
    toStore.push(map);
    toStore.push(displayCelestial);
    toStore.push(credits);

    var saved = false;
    while (!saved) {
        try {
            localStorage.setItem(saveNameFull, JSON.stringify(toStore));
            saved = true;
        } catch (error) {
            //There was an error saving, loop through local storage and
            //try to remove an old save, if no save found cancel saving
            //and alert the player

            if (!confirm("Storage full, do you wish to delete a random save?")) {
                //User doesn't wish to delete a save
                return;
            }
            var saveFound = false;
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.startsWith("Save_")) {
                    localStorage.removeItem(key);
                    i = localStorage.length;
                    saveFound = true;
                }
            }
            if (!saveFound) {
                saved = true;//set saved to true to exit loop
                alert("Save failed: Storage full and no old save found")
            }
        }
    }

    //Reload Saves after a save
    showLoadSelection();
}

//Creates a new option for our loading selection with
//an event to call the loading function when the option
//is clicked on
function addLoadSelectOption(element, value, innerHTML) {
    var newOption = document.createElement('option');
    newOption.value = value;
    newOption.innerHTML = innerHTML;
    //newOption.onClick = function() { loadSave(value); };
    if (value != "Default")
        newOption.style.color = "black";
    element.appendChild(newOption);
}

function showLoadSelection() {
    //Find all required elements
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
}

function loadSave(saveName) {
    console.log("LOADING SAVE")
    //if default option was pressed, return
    if (saveName === "Default")
        return;
    var toLoad = JSON.parse(localStorage.getItem(saveName));
    //Don't try and load if save doesn't exist or if it's the wrong size
    if (toLoad === null || toLoad.length != 9)
        return;
    
    //set the globals to what we loaded in
    supplies = toLoad[0];
    document.getElementById("supplies").value = supplies;
    energy = toLoad[1];
    document.getElementById("energy").value = energy;
    isRegularPlay = toLoad[2];
    hasEnhancedSensors = toLoad[3];
    isWormholeActive = toLoad[4];
    player = toLoad[5];
    map = toLoad[6];
    displayCelestial = toLoad[7];
    credits = toLoad[8];
    document.getElementById("credits").value = credits;

    //Update the map and focus on player
    celestialMap.update();
    celestialMap.onPlayerMovement(player);
}
