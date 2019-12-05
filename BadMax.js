class Node {
    constructor(parent, position) {
        this.parent = parent;
        this.position = position;

        this.f = 0; //total cost of current node
        this.g = 0; //distance from current node to start
        this.h = 0; //estimated distance from current node to end
    }
}

//https://en.wikipedia.org/wiki/Taxicab_geometry
function getManhattanDist(startPos, endPos) {
    return (Math.abs(startPos.x - endPos.x)) + (Math.abs(startPos.y - endPos.y));
}

//Checks if the provided point is within the bounds and no artifact exists there
function validPosition(x, y) {
    if (x < 0 || x > (map.bounds.x - 1) || y < 0 || y > (map.bounds.y - 1) || map.data[x][y].artifact != null) {
        return false;
    }
    return true;
}

//Finds the valid N,E,S,W neighbors of the provided node and returns them
function getNeighbours(node) {
    var neighbors = [];
    var x = node.position.x;
    var y = node.position.y;
    if (validPosition(x, y - 1)) {
        neighbors.push(new Node(node, {x: x, y: y - 1}));
    }
    if (validPosition(x, y + 1)) {
        neighbors.push(new Node(node, {x: x, y: y + 1}));
    }
    if (validPosition(x - 1, y)) {
        neighbors.push(new Node(node, {x: x - 1, y: y}));
    }
    if (validPosition(x + 1, y)) {
        neighbors.push(new Node(node, {x: x + 1, y: y}));
    }

    //uncomment to allow diagonal movement
    /*
    if (validPosition(x - 1, y - 1)) {
        neighbors.push(new Node(node, {x: x - 1, y: y - 1}));
    }
    if (validPosition(x - 1, y + 1)) {
        neighbors.push(new Node(node, {x: x - 1, y: y + 1}));
    }
    if (validPosition(x + 1, y - 1)) {
        neighbors.push(new Node(node, {x: x + 1, y: y - 1}));
    }
    if (validPosition(x + 1, y + 1)) {
        neighbors.push(new Node(node, {x: x + 1, y: y + 1}));
    }
    */
    return neighbors;
}

//Uses the A* algorithm as seen here https://en.wikipedia.org/wiki/A*_search_algorithm
function getPath(startPos, endPos) {
    //don't even try if start or end position is invalid
    if (validPosition(startPos.x, startPos.y) === false || validPosition(endPos.x, endPos.y) === false) {
        return null;
    }

    var startNode = new Node(null, startPos);
    var endNode = new Node(null, endPos);
    startNode.g = 0; //current distance from start is 0
    startNode.h = getManhattanDist(startNode.position, endNode.position);
    startNode.f = startNode.g + startNode.h;

    var openList = [];
    var closedList = [];

    openList.push(startNode);

    while (openList.length > 0) {
        var currentNode = openList[0];
        var currentIndex = 0;

        //get lowest cost node and set it to current
        //priority list is better as this gives us
        //O(n) worst case
        for (var i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        //currentNode is at where we want it to be, get the path and return it
        if (currentNode.position.x == endNode.position.x && currentNode.position.y == endNode.position.y) {
            var path = [];
            var current = currentNode;
            while (current != null) {
                path.push(current.position);
                current = current.parent;
            }
            return path;
        }

        var neighbors = getNeighbours(currentNode);
        neighbors.forEach(function (neighbor) {
            for (var i = 0; i < closedList.length; i++) {
                if (neighbor.position.x == closedList[i].position.x && neighbor.position.y == closedList[i].position.y) {
                    //neighbor is in the closed list, skip it
                    return;
                }
            }

            var inOpen = false;
            for (var i = 0; i < openList.length; i++) {
                if (neighbor.position.x == openList[i].position.x && neighbor.position.y == openList[i].position.y) {
                    //neighbor is in the open list, flag it
                    inOpen = true;
                }
            }

            //get temp values and set if they are better than what we currently have
            var tempg = currentNode.g + 1;
            var temph = getManhattanDist(neighbor.position, endNode.position);
            var tempf = tempg + temph;
            if (inOpen == false || tempf < neighbor.f) {
                neighbor.g = tempg;
                neighbor.h = temph;
                neighbor.f = tempf;
                if (inOpen == false) {
                    openList.push(neighbor);
                }
            }     
        });
    }
}

//Checks if bad max can board and if he can he steals 25% of the energy and supplies
//and teleports to a random location
function checkBadMaxPos() {
    if (badMax.position.x == player.position.x && badMax.position.y == player.position.y) {
        //bad max got the player, board them
        var energyStolen = Math.round(energy * 0.25);//Steal 25% energy
        var suppliesStolen = Math.round(supplies * 0.25);//Steal 25% supplies
        decrementEnergy(energyStolen);
        decrementSupplies(suppliesStolen);
        makeModalMenu("Bad Max boarded your ship and stole " + energyStolen + " energy and " + suppliesStolen + " supplies", {
            "OK": () => {
            }
         }, false);
        //Teleport bad max away to a random spot
        var teleported = false;
        while (teleported == false) {
            var randomX = Math.floor(Math.random() * map.bounds.x);
            var randomY = Math.floor(Math.random() * map.bounds.y);
            if (validPosition(randomX, randomY) && randomX != player.position.x && randomY != player.position.y) {
                badMax.position.x = randomX;
                badMax.position.y = randomY;
                teleported = true;
            }
        }
    }
}

function moveBadMax() {
    checkBadMaxPos();//Check first if the case is the player moving into bad max
    var path = getPath(player.position, badMax.position);
    for (var i = 0; i < path.length; i++) {
        if (path[i].x != badMax.position.x || path[i].y != badMax.position.y) {
            badMax.position.x = path[i].x;
            badMax.position.y = path[i].y;
            checkBadMaxPos();//check again after movement
            return;
        }
    }
}