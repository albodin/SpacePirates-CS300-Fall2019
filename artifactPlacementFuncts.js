//example obj
/*
{
    asteroid: [
        "x":1,
        "y":2
    ],
    "planet": null,
    "station": null,
    "kola": null,
    "mart": null
}
*/

//object to store coordinate vals
var coordinates = {
    "asteroid": null,
    "planet": null,
    "station": null,
    "kola": null,
    "mart": null
}

function getArtifactCoord(){
    asteroidCoord = document.getElementById("asteroid").value
    console.log(asteroidCoord)
    coordinates["asteroid"] = strToObj(asteroidCoord)

    planetCoord = document.getElementById("planet").value
    coordinates["planet"] = strToObj(planetCoord)

    stationCoord = document.getElementById("station").value
    coordinates["station"] = strToObj(stationCoord)

    kolaCoord = document.getElementById("kola").value
    coordinates["kola"] = strToObj(kolaCoord)

    martCoord = document.getElementById("mart").value
    coordinates["mart"] = strToObj(martCoord)

    console.log(coordinates)

}


//formats string into object and returns it
function strToObj(str) {
    //enclose obj str in array
    var enclosed = "[" + str + "]"
    //regex to turn a:1 -> "a":1 for JSON format
    var formatted = enclosed.replace(/([a-zA-Z0-9-]+):/g, "\"$1\":");
    try {
        var parsed = JSON.parse(formatted)
    } catch (error) {
        console.log("There's something wrong with the string!")
    }
   
    return parsed
}


