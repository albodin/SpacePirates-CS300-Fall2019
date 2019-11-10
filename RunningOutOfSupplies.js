function checkSupplies() {
   if (supplies <= 0) {
      if (isRegularPlay) {
         alert("You ran out of supplies. Game over");
         //TODO: Call function to reset game
      }
      else
         alert("You ran out of supplies");
   }
      
}
