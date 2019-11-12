function checkEnergy() {
   alert ("Checking Energy");
   if(energy <=0)
   {
      if(isRegularPlay)
      {
         alert ("You are out of energy. Game over");
         //TODO restart game
      }

      else //not regular game mode
          alert("You ran out of energy")

   }
}
