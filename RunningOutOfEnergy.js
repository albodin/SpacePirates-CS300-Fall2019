
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

//Reduces energy by 1
function  decrementEnergy(){

   energy = parseInt(document.getElementById("energy").value);
   energy--;
   document.getElementById("energy").value = energy;
}
