
function moveSpacecraft(angle, distance) {
   var distance = parseInt(document.getElementById("distance").value)

   movement(angle, distance)
   currentPosition()
   checkEnergy();
   checkSupplies();
   updateCelestialMap()

}

// function checkBoundry(distance) { }

function movement(angle, distance) {
   /*
      use: moves the spaceshipt based on input index.html
      */
   console.log(distance)
   distance = distance ? distance : 1;
   for(var i = 0; i<distance; ++i) {
       //  Up
       if (angle === 0) {
           player.position.x++;
       }
       // Right
       else if (angle === 90) {
           player.position.y++;
       }
       // Left
       else if (angle === 180) {
           player.position.y--;
       }
       // Down
       else if (angle === 270) {
           player.position.x--;
       }

       //update the Energy after a player makes a move
        decrementEnergy();

       //Set the points to visible with a radius of 1 around the player
       setVisible(1);
       console.log(energy)
       console.log(player.position)
   }

};

let currentPosition = () =>{
   //update x 
   document.getElementById("xVal").value = player.position.x
   //update y 
   document.getElementById("yVal").value = player.position.y
}
