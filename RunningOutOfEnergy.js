
function checkEnergy() {
   alert ("Checking Energy");
   if(energy <=0)
   {
      //TODO Make sure that is Regular play works correctly
      if(isRegularPlay === 1)
      {
         alert ("You are out of energy. Game over");
         restart();
      }

      else //not regular game mode
          alert("You ran out of energy");

   }
   console.log(isRegularPlay)
}

//updates the energy value after a
function  updateEnergy(){

   var newEnergy = parseInt(document.getElementById("energy").value);
   var distMoved = parseInt(document.getElementById("distance").value);

   //if we get a negative or 0 value, assume 1
   if(distMoved <= 0){
      distMoved =1
   }
   //else
   //otherwise the distance will remain the same as the input value

   newEnergy -= distMoved;
   energy = newEnergy;
   document.getElementById("energy").value = energy;
}
