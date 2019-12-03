//Checks if you are in the same space as an artifact, if you are it does something special and returns true.
function checkForArtifact(){
    if(!map.data[player.position.x][player.position.y].artifact)
        return false;

    var location = map.data[player.position.x][player.position.y]
    var tile = map.data[player.position.x][player.position.y].artifact;

    //there is a celestial object in our space
    if (tile && tile.type) {
        switch (tile.type) {
            case CA__ASTEROID:
                makeModalMenu('Collided with an asteroid!')
                return true;
            case CA__PLANET:
                planet(tile);
                return true;
            case CA__SPACE_STATION:
                spaceStation()
                return true;
            case CA__ENERGY_STATION:
                energyStation()
                return true;
            case CA__ABANDONED_FREIGHTER:
                abandonedFreighter(location)
                return true;
            case CA__MINI_MART:
                miniMart()
                return true;
            case CA__KOKA_KOLA:
                winGame();
                return true;
        }
    }
}

function abandonedFreighter(location) {
    makeModalMenu('Abandoned Freighter', {
        'Investigate': () => {
            s = Math.floor(Math.random() * 20)
            e = Math.floor(Math.random() * 500)
            makeModalMenu(`Found ${s} supplies and ${e} energy`)
            document.getElementById("supplies")
                .value = supplies += s
            document.getElementById("energy")
                .value = energy += e
            location.artifact = null
            return false
        },
    })
}

function planet(artifact) {
    let {name} = artifact
    switch (name) {
        case 'Celeron':
            makeModalMenu('Celeron', {
                'Visit Musk-Tesla Energy Station': () => energyStation(),
                'Visit Mini-Mart': () => miniMart(),
                'Visit Repair Depot': () => {
                    makeModalMenu('No repairs needed')
                    return true
                }
            })
            return;
        case 'Ryzen':
            makeModalMenu('Ryzen', {
                'Visit Murk-Tusla Energy Station': () => energyStation(20),
                'Visit Shady-Mart': () => miniMart(20),
            })
            return
        case 'Xeon':
            makeModalMenu('Xeon', {
                'Visit Musk-Tesla Energy Station': () => energyStation(),
                'Visit Mini-Mart': () => miniMart(),
            })
            return;
        default:
            makeModalMenu('This planet appears uninhabited')
    }
}

function spaceStationOLD() {
    let cost = 10
    let playing = confirm(`Play a game of chance with a Casinian? (10 Credits)`)
    let pot = cost
    let win = false
    credits -= cost
    while (playing) {
        pot *= 2
        if (Math.random() > 0.5) {
            playing = confirm(`You won! Walk away with ${pot} ` +
                '(Cancel) or keep it rolling (OK)?' +
                `\n[Credits remaining: ${credits}]`)
            win = true
        } else {
            playing = confirm(`Bust! Pay ${pot} to double down?` +
                `\n[Credits remaining: ${credits}]`)
            win = false
            if (credits > pot)
                credits -= pot
            else {
                playing = false
                alert("You don't have enough credits")
            }
        }
        document.getElementById("credits").value = credits;
    }
    if (win) 
        credits += pot
    document.getElementById("credits").value = credits;
}

function spaceStation() {
    let cost = 10
    let pot = cost
    let cantAfford = () => {
        if (credits < pot) {
            makeModalMenu('Not enough Credits!')
            return true
        }
        return false
    }
    let gameTurn = () => {
        pot *= 2
        if (Math.random() > 0.5) {
            makeModalMenu(`Win! Pot: ${pot} Credits`, {
                [`Walk away with ${pot} credits`]: () => {
                    credits += pot
                    document.getElementById("credits").value = credits;
                    return false
                },
                'Double or nothing!': () => {
                    gameTurn()
                    return false
                },
            },
            false) // no exit option
        } else {
            makeModalMenu(`Loss!`, {
                [`Double or nothing! (${pot} Credits)`]: () => {
                    if (cantAfford())
                        return false
                    credits -= pot
                    document.getElementById("credits").value = credits;
                    gameTurn()
                    return false
                },
            })
        }
    }
    makeModalMenu('Space Station', {
        'Play a game of chance? (10 Credits)': () => {
            if (cantAfford())
                return false
            credits -= pot
            document.getElementById("credits").value = credits;
            return gameTurn()
        }
    })
}

function energyStation(c, e) {
    // defaults
    c = c || 10
    e = e || 1000

    makeModalMenu("Musk-Tesla Energy Station", {
        [`Pay ${c} Credits for ${e} Energy`]: () => {
            if (credits < c) {
                makeModalMenu("Not enough credits")
                return true
            }
            document.getElementById("energy")
                .value = energy += e
            document.getElementById("credits")
                .value = credits -= c
            return true
        }
    })
    // when called from another modal, DO NOT close that modal
    return true
}

function miniMart(c, s) {
    // defaults
    c = c || 10
    s = s || 50
    makeModalMenu("Mini Mart", {
        "Pay 10 Credits for 50 Supplies": () => {
            if (credits < c) {
                makeModalMenu("Not enough credits")
                return true
            }
            document.getElementById("supplies")
                .value = supplies += s
            document.getElementById("credits")
                .value = credits -= c
            return true
        },
    })
    // when called from another modal, DO NOT close that modal
    return true
}

function makeModalMenu(title, options, exit) {
    // default value
    options = options || {}
    if (exit === undefined) exit = true
    // grey backdrop
    let modal = document.createElement("div")
    // holds options
    let modalOptions = document.createElement("div")
    let titleElement = document.createElement("h2")
    titleElement.innerText = title
    modalOptions.appendChild(titleElement)
    modal.appendChild(modalOptions)
    // styles
    modal.classList.add('modal')
    modalOptions.classList.add('modal-options')
    if (exit)
        options["Exit"] = () => false
    for (let option in options) {
        // make button
        let element = document.createElement("input")
        element.setAttribute("type", "button")
        element.value = option
        // set click callback
        element.onclick = () => onOptionClick(modal, options[option])
        // add to modal
        modalOptions.appendChild(element)
    }
    document.querySelector('#modal-parent').appendChild(modal)
}

function onOptionClick(modal, callback) {
    if (!callback()) destroyModal(modal)
}

function destroyModal(modal) {
    modal.parentElement.removeChild(modal)
}
