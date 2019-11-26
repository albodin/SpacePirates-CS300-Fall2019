function readSettings() {
  if(typeof(Storage) !== "undefined") {
    if (localStorage.locationx) {
      startx = localStorage.locationx;
    }
	if (localStorage.locationy) {
      starty = localStorage.locationy;
    } 
	if (localStorage.startEnergy) {
      startEnergy = localStorage.startEnergy;
    }
	if (localStorage.startSupplies) {
      startSupplies = localStorage.startSupplies;
    }
	if (localStorage.isRegularPlay) {
      isRegularPlay = localStorage.isRegularPlay;
    }
	if (localStorage.isWormholeFixed) {
      isWormholeActive = localStorage.isWormholeFixed;
    }
	if (localStorage.map) {
      map = localStorage.map;
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
  localStorage.removeItem("map");
}

function save() {
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
	if (document.getElementById("regular").checked == "true")
	  localStorage.setItem("isRegularPlay", "true");
	if (document.getElementById("test").checked == "true")
	  localStorage.setItem("isRegularPlay", "false");
	if (document.getElementById("fixed").checked == "true")
	  localStorage.setItem("isWormholeFixed", "true");
	if (document.getElementById("random").checked == "true")
	  localStorage.setItem("isWormholeFixed", "false");
	if (document.getElementById("xMap").value !== "" && document.getElementById("yMap").value !== "")
	  localStorage.setItem("map", "{ bounds: { x: " + document.getElementById("xMap").value + ", y: " + document.getElementById("yMap").value +"} }");
  }
  else {
	alert("Sorry, your browser does not support Web Storage...");
  }
}



//let player = {
//    position: {x: 12, y: 12}
//}