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
var coordinates = {}


function getArtifactCoord() {
    asteroidCoord = document.getElementById("asteroid").value
    // console.log("hello")
    // console.log(asteroidCoord)
    coordinates["asteroid"] = strToObj(asteroidCoord)

    planetCoord = document.getElementById("planet").value
    coordinates["planet"] = strToObj(planetCoord)

    stationCoord = document.getElementById("station").value
    coordinates["station"] = strToObj(stationCoord)

    kolaCoord = document.getElementById("kola").value
    coordinates["kola"] = strToObj(kolaCoord)

    martCoord = document.getElementById("mart").value
    coordinates["mart"] = strToObj(martCoord)

    localStorage.setItem('artifactCoords', JSON.stringify(coordinates));
    //customArtifactPlacement()
    // console.log(coordinates)


}

//password 
function validatePass() {
    if (document.getElementById('password').value == 'hi') {
        return true;
    } else {
        alert('wrong password!!');
        return false;
    }
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

//place artifacts based on custom settinfs
function customArtifactPlacement() {
    try {
        if (getArtifactCoords["asteroid"]) {
            getArtifactCoords["asteroid"].forEach(function (obj) {
                // console.log(obj.x, obj.y)
                map.data[obj.x][obj.y].artifact = { type: CA__ASTEROID };
            })
        }
    } catch (error) {
        // console.log(error)
        // console.log("error in asteroid")
    }

    try {
        if (getArtifactCoords["planet"]) {
            getArtifactCoords["planet"].forEach(function (obj) {
                map.data[obj.x][obj.y].artifact = { type: CA__PLANET };
            })
        }
    } catch (error) {
        // console.log("error in planet")
    }
    try {
        if (getArtifactCoords["station"]) {
            getArtifactCoords["station"].forEach(function (obj) {
                map.data[obj.x][obj.y].artifact = { type: CA__SPACE_STATION };
            })
        }
    } catch (error) {
        // console.log("error in station")

    }

    try {
        if (getArtifactCoords["kola"]) {
            getArtifactCoords["kola"].forEach(function (obj) {
                map.data[obj.x][obj.y].artifact = { type: CA__KOKA_KOLA };
            })
        }
    } catch (error) {
        // console.log("error in kola")

    }
    try {
        if (getArtifactCoords["mart"]) {
            getArtifactCoords["mart"].forEach(function (obj) {
                map.data[obj.x][obj.y].artifact = { type: CA__MINI_MART };
            })
        }
    } catch (error) {
        // console.log("error in mart")

    }

}

