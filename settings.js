function readSettings() {
	var requestURL = "settings.json";
	var request = new XMLHttpRequest();
	request.open("GET", requestURL);
	request.responseType = "json";
	request.send();
	//var setting = JSON.parse(settingText);
	request.onload = function() {
		var setting = request.response;
		document.getElementById("xVal").value = setting["locationX"];
		document.getElementById("yVal").value = setting["locationY"];
		document.getElementById("energy").value = setting["energy"];
		document.getElementById("supplies").value = setting["supplies"];
	}
}