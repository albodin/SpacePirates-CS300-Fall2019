
function moveSpacecraft(angle, distance) {
   var distance = document.getElementById("distance").value
   
   movement(angle, distance)
   currentPosition()
   //checkEnergy();
   // checkSupplies();
}

// function checkBoundry(distance) { }

function movement(angle, distance) {
   /*
      use: moves the spaceshipt based on input index.html
      */
   console.log(distance)
   distance = distance ? distance : 1;
   //  Up
   if (angle === 0) {
      player.position.x += distance;
   }
   // Right
   else if (angle === 90) {
      player.position.y += distance;
   }
   // Left
   else if (angle === 180) {
      player.position.y -= distance;
   }
   // Down
   else if (angle === 270) {
      player.position.x -= distance;
   }

   console.log(player.position)

};

let currentPosition = () =>{
   //update x 
   document.getElementById("xVal").value = player.position.x
   //update y 
   document.getElementById("yVal").value = player.position.y
}