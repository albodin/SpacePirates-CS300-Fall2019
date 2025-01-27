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
	if (localStorage.startCredits) {
      startCredits = parseInt(localStorage.getItem("startCredits"));
    }
	if (localStorage.isRegularPlay) {
      isRegularPlay = (localStorage.getItem("isRegularPlay") === "true");
    }
	if (localStorage.isWormholeFixed) {
      isWormholeActive = (localStorage.getItem("isWormholeFixed") === "true");
    }
	if (localStorage.displayCelestial) {
      displayCelestial = (localStorage.getItem("displayCelestial") === "true");
    }
	if (localStorage.mapx && localStorage.mapx) {
	  map.bounds.x = parseInt(localStorage.mapx);
	  map.bounds.y = parseInt(localStorage.mapy);
    }
  }
}

function resetSettings() {
  localStorage.removeItem("locationx");
  localStorage.removeItem("locationy");
  localStorage.removeItem("startEnergy");
  localStorage.removeItem("startSupplies");
  localStorage.removeItem("startCredits");
  localStorage.removeItem("isRegularPlay");
  localStorage.removeItem("isWormholeFixed");
  localStorage.removeItem("mapx");
  localStorage.removeItem("mapy");
  localStorage.removeItem("displayCelestial");
  loadSettings();
}

function saveSettings() {
  if (typeof(Storage) !== "undefined") {
	if (document.getElementById("startX").value != "")
	  localStorage.setItem("locationx", document.getElementById("startX").value);
	if (document.getElementById("startY").value != "")
	  localStorage.setItem("locationy", document.getElementById("startY").value);
	if (document.getElementById("energy").value != "")
	  localStorage.setItem("startEnergy", document.getElementById("energy").value);
	if (document.getElementById("supplies").value != "")
	  localStorage.setItem("startSupplies", document.getElementById("supplies").value);
	if (document.getElementById("credits").value != "")
	  localStorage.setItem("startCredits", document.getElementById("credits").value);
	if (document.getElementById("regular").checked)
	  localStorage.setItem("isRegularPlay", true);
	if (document.getElementById("test").checked)
	  localStorage.setItem("isRegularPlay", false);
	if (document.getElementById("fixed").checked)
	  localStorage.setItem("isWormholeFixed", false);
	if (document.getElementById("random").checked)
	  localStorage.setItem("isWormholeFixed", true);
    if (document.getElementById("display").checked)
	  localStorage.setItem("displayCelestial", true);
	if (document.getElementById("hidden").checked)
	  localStorage.setItem("displayCelestial", false);
	if (document.getElementById("xMap").value != "" && document.getElementById("yMap").value != ""){
	  localStorage.setItem("mapx", document.getElementById("xMap").value);
	  localStorage.setItem("mapy", document.getElementById("yMap").value);
	//  localStorage.setItem("map", "{ bounds: { x: " + document.getElementById("xMap").value + ", y: " + document.getElementById("yMap").value +"} }");
	}
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
  if (localStorage.startCredits)
	document.getElementById("credits").value = localStorage.getItem("startCredits");
  else
    document.getElementById("credits").value = startCredits;
  if (localStorage.isRegularPlay) {
	if (localStorage.getItem("isRegularPlay") == "true")
	  document.getElementById("regular").checked = true;
    else
	  document.getElementById("test").checked = true;
  } 
  else {
	if (isRegularPlay == true)
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
	if (isWormholeActive == false)
	  document.getElementById("fixed").checked = true;
	else
		document.getElementById("random").checked = true;
  }
  if (localStorage.displayCelestial) {
	if (localStorage.getItem("displayCelestial") == "true")
	  document.getElementById("display").checked = true;
    else
	  document.getElementById("hidden").checked = true;
  } 
  else {
	if (displayCelestial == false)
	  document.getElementById("hidden").checked = true;
	else
		document.getElementById("display").checked = true;
  }
  if (localStorage.mapx && localStorage.mapx) {
	document.getElementById("xMap").value = localStorage.mapx;
	document.getElementById("yMap").value = localStorage.mapy;
  }
  else {
	document.getElementById("xMap").value = map.bounds.x;
	document.getElementById("yMap").value = map.bounds.y;
  }
}