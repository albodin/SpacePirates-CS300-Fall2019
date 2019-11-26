function readSettingsFromLocalStorage() {
  if(typeof(Storage) !== "undefined") {
    if (localStorage.locationx) {
      startx = localStorage.getItem("locationx");
    }
	if (localStorage.locationy) {
      starty = localStorage.getItem("locationy");
    } 
	if (localStorage.startEnergy) {
      startEnergy = localStorage.getItem("startEnergy");
    }
	if (localStorage.startSupplies) {
      startSupplies = localStorage.getItem("startSupplies");
    }
	if (localStorage.isRegularPlay) {
      isRegularPlay = localStorage.getItem("isRegularPlay");
    }
	if (localStorage.isWormholeFixed) {
      isWormholeActive = localStorage.getItem("isWormholeFixed");
    }
	if (localStorage.map) {
      map = localStorage.getItem("map");
    }
  }
}

function resetSettings() {
  localStorage.setItem("locationx", startx);
  localStorage.setItem("locationy", starty);
  localStorage.setItem("startEnergy", startEnergy);
  localStorage.setItem("startSupplies", startSupplies);
  localStorage.setItem("startCredits", "undefined");
  localStorage.setItem("isRegularPlay", isRegularPlay);
  localStorage.setItem("isWormholeFixed", isWormholeActive);
  localStorage.setItem("map", map);
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
	  localStorage.setItem("isRegularPlay", "true");
	if (document.getElementById("test").checked)
	  localStorage.setItem("isRegularPlay", "false");
	if (document.getElementById("fixed").checked)
	  localStorage.setItem("isWormholeFixed", "true");
	if (document.getElementById("random").checked)
	  localStorage.setItem("isWormholeFixed", "false");
	if (document.getElementById("xMap").value !== "" && document.getElementById("yMap").value !== "")
	  localStorage.setItem("map", "{ bounds: { x: " + document.getElementById("xMap").value + ", y: " + document.getElementById("yMap").value +"} }");
  }
  else {
	alert("Sorry, your browser does not support Web Storage...");
  }
}

function loadSettings() {
  if (typeof(Storage) !== "undefined") {
	if (localStorage.locationx) {
      document.getElementById("startX").value = localStorage.getItem("locationx");
    }
	if (localStorage.locationy) {
      document.getElementById("startY").value = localStorage.getItem("locationy");
    } 
	if (localStorage.startEnergy) {
      document.getElementById("energy").value = localStorage.getItem("startEnergy");
    }
	if (localStorage.startSupplies) {
      document.getElementById("supplies").value = localStorage.getItem("startSupplies");
    }
	if (localStorage.isRegularPlay) 
	  if (localStorage.getItem("isRegularPlay") == "true")
	    document.getElementById("regular").checked = true;
	  else 
	    document.getElementById("test").checked = true;
	if (localStorage.isWormholeFixed) {
	  if (localStorage.getItem("isWormholeFixed") == "true") 
	    document.getElementById("fixed").checked = true;
	  else
		document.getElementById("random").checked = true;
    }
  }
  else {
	alert("Sorry, your browser does not support Web Storage...");
  }
}

//let player = {
//    position: {x: 12, y: 12}
//}