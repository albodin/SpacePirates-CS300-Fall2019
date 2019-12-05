
function checkEnergy() {
   if(energy <=0)
   {
      if(isRegularPlay)
      {
         restart();
         makeModalMenu('You are out of energy. Game over!', {
            'Restart': () => {
            }
         },false)
      }
      return false;
   }
   else
      return true;
}

//Reduces energy by 1
function  decrementEnergy(energyCost){

   energy = parseInt(document.getElementById("energy").value);
   energy -= energyCost;
   document.getElementById("energy").value = energy;
}
