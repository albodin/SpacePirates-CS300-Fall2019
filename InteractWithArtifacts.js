function abandonedFreighter(location) {
    makeModalMenu('Abandoned Freighter', {
        'Investigate': () => {
            s = Math.floor(Math.random() * 20)
            e = Math.floor(Math.random() * 500)
            makeModalMenu(`Found ${s} supplies and ${e} energy`)
            supplies = Math.min(supplies + s, 100)
            document.getElementById("supplies")
                .value = supplies
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
        [`Pay ${c} Credits for ${s} Supplies`]: () => {
            if (credits < c) {
                makeModalMenu("Not enough credits")
                return true
            }
            supplies = Math.min(supplies + s, 100)
            document.getElementById("supplies")
                .value = supplies
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
