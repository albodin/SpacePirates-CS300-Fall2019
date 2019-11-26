function readSettingsFromLocalStorage() {
  if(typeof(Storage) !== "undefined") {
    if (localStorage.locationx) {
      startx = parseInt(localStorage.getItem("locationx"));
    }
	if (localStorage.locationy) {
      starty = parseInt(localStorage.getItem("locationy"));
    } 
	if (localStorage.startEnergy) {
      startEnergy = parseInt(localStorage.getItem("startEnergy"));
    }
	if (localStorage.startSupplies) {
      startSupplies = parseInt(localStorage.getItem("startSupplies"));
    }
	if (localStorage.isRegularPlay) {
      isRegularPlay = (localStorage.getItem("isRegularPlay") === "true");
    }
	if (localStorage.isWormholeFixed) {
      isWormholeActive = (localStorage.getItem("isWormholeFixed") === "true");
    }
	//if (localStorage.map) {
    //  map = localStorage.getItem("map");
    //}
  }
}

function resetSettings() {
  localStorage.removeItem("locationx");
  localStorage.removeItem("locationy");
  localStorage.removeItem("startEnergy");
  localStorage.removeItem("startSupplies");
  localStorage.removeItem("isRegularPlay");
  localStorage.removeItem("isWormholeFixed");
  loadSettings();
}

function saveSettings() {
  if (typeof(Storage) !== "undefined") {
	if (document.getElementById("startX").value !== "")
	  localStorage.setItem("locationx", document.getElementById("startX").value);
	if (document.getElementById("startY").value !== "")
	  localStorage.setItem("locationy", document.getElementById("startY").value);
	if (document.getElementById("energy").value !== "")
	  localStorage.setItem("startEnergy", document.getElementById("energy").value);
	if (document.getElementById("supplies").value !== "")
	  localStorage.setItem("startSupplies", document.getElementById("supplies").value);
	if (document.getElementById("credits").value !== "")
	  localStorage.setItem("startCredits", document.getElementById("credits").value);
	if (document.getElementById("regular").checked)
	  localStorage.setItem("isRegularPlay", true);
	if (document.getElementById("test").checked)
	  localStorage.setItem("isRegularPlay", false);
	if (document.getElementById("fixed").checked)
	  localStorage.setItem("isWormholeFixed", false);
	if (document.getElementById("random").checked)
	  localStorage.setItem("isWormholeFixed", true);
	if (document.getElementById("xMap").value !== "" && document.getElementById("yMap").value !== "")
	  localStorage.setItem("map", "{ bounds: { x: " + document.getElementById("xMap").value + ", y: " + document.getElementById("yMap").value +"} }");
  }
  else {
	alert("Sorry, your browser does not support Web Storage...");
  }
}

function loadSettings() {
  if (localStorage.locationx)
	document.getElementById("startX").value = localStorage.getItem("locationx");
  else
	document.getElementById("startX").value = startx;
  if (localStorage.locationy)
	document.getElementById("startY").value = localStorage.getItem("locationy");
  else
    document.getElementById("startY").value = starty;
  if (localStorage.startEnergy)
	document.getElementById("energy").value = localStorage.getItem("startEnergy");
  else
    document.getElementById("energy").value = startEnergy;
  if (localStorage.startSupplies)
	document.getElementById("supplies").value = localStorage.getItem("startSupplies");
  else
    document.getElementById("supplies").value = startSupplies;
  if (localStorage.isRegularPlay) {
	if (localStorage.getItem("isRegularPlay") == "true")
	  document.getElementById("regular").checked = true;
    else
	  document.getElementById("test").checked = true;
  } 
  else {
	if (isRegularPlay = true)
	  document.getElementById("regular").checked = true;
	else 
	  document.getElementById("test").checked = true;
  }
  if (localStorage.isWormholeFixed) {
	if (localStorage.getItem("isWormholeFixed") == "false")
	  document.getElementById("fixed").checked = true;
    else
	  document.getElementById("random").checked = true;
  } 
  else {
	if (isWormholeActive = true)
	  document.getElementById("fixed").checked = true;
	else
		document.getElementById("random").checked = true;
  }
}

//let player = {
//    position: {x: 12, y: 12}
//}