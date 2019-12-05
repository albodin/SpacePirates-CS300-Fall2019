function placeArtifacts() {
    // place user artifacts
    customArtifactPlacement()
    // hardcoded because max starts on it
    placeNamedPlanet('Ryzen', 40, 43, true)

    // fills map with some artifacts
    let artifacts = [
        // asteroid
        { count: 70, fn: (x, y) => placeArtifact(CA__ASTEROID, x, y) },
        // freighter
        { count: 40, fn: (x, y) => placeArtifact(CA__ABANDONED_FREIGHTER, x, y) },
        // mini mart
        { count: 11, fn: (x, y) => placeArtifact(CA__MINI_MART, x, y) },
        // space stations
        { count: 20, fn: (x, y) => placeArtifact(CA__SPACE_STATION, x, y) },
        // energy stations
        { count: 11, fn: (x, y) => placeArtifact(CA__ENERGY_STATION, x, y) },
        // planet
        { count: 11, fn: (x, y) => placeArtifact(CA__PLANET, x, y) },
        // recipe
        { count: 1, fn: (x, y) => placeArtifact(CA__KOKA_KOLA, x, y) },
        // planets
        { count: 1, fn: (x, y) => placeNamedPlanet('Celeron', x, y, true) },
        // planets
        { count: 1, fn: (x, y) => placeNamedPlanet('Xeon', x, y, true) },
    ]

    // populate map
    for (let a of artifacts)
        for (let i = 0; i < a.count; ++i) {
            while (true) {
                // find a spot
                let x = Math.floor(Math.random() * map.bounds.x)
                let y = Math.floor(Math.random() * map.bounds.y)
                // make sure nothing is there
                let noArtifact = map.data[x][y].artifact == null
                let playerAtSpot = x == player.position.x && y == player.position.y
                let maxAtSpot = x == badMax.position.x && y == badMax.position.y
                if (noArtifact && !playerAtSpot && !maxAtSpot) {
                    a.fn(x, y)
                    break;
                }
            }
        }

    if (displayCelestial) gazetteer()
}

function gazetteer() {
    artifacts = []
    for (x in map.data)
        for (y in map.data[x])
            if (map.data[x][y].artifact) {
                let {type, name} = map.data[x][y].artifact
                map.data[x][y].visible = true
                artifacts.push(`${type} \'${name ? name : 'unnamed'}\' at ${x}, ${y}`)
            }
    for (artifact in artifacts) 
        console.log(artifacts[artifact])
}

function getGoal() {
    for (x in map.data)
        for (y in map.data[x])
            if (map.data[x][y].artifact &&
                    map.data[x][y].artifact.type == CA__KOKA_KOLA)
                map.data[x][y].visible = true
}

function placeArtifact(type, x, y) {
    map.data[x][y].artifact = { type: type }; return
}

function placeNamedPlanet(name, x, y, visible) {
    map.data[x][y] = {
        visible: visible,
        artifact: {
            type: CA__PLANET,
            name: name,
        }
    }
}
