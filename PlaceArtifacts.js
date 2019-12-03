function placeArtifacts() {
    // fills map with some artifacts
    map.data[0][0].artifact = { type: CA__ASTEROID }
    map.data[3][3].artifact = { type: CA__PLANET }
    map.data[4][4].artifact = { type: CA__ABANDONED_FREIGHTER }
    map.data[2][2].artifact = { type: CA__SPACE_STATION }
    map.data[5][7].artifact = { type: CA__KOKA_KOLA }
    map.data[8][8].artifact = { type: CA__MINI_MART }
    map.data[14][14].artifact = { type: CA__ENERGY_STATION }
    map.data[16][16] = {
        visible: true,
        artifact: {
            type: CA__PLANET,
            name: 'Celeron',
            color: '#994433',
        }
    }
    map.data[2][4] = {
        visible: true,
        artifact: {
            type: CA__PLANET,
            name: 'Xeon',
            color: '#449933',
        }
    }
    map.data[2][6] = {
        visible: true,
        artifact: {
            type: CA__PLANET,
            name: 'Ryzen',
            color: '#999922',
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
