function checkSupplies() {
   if (supplies <= 0) {
      if (isRegularPlay) {
         alert("You ran out of supplies. Game over");
         restart();
      }
      else
         alert("You ran out of supplies");
   }
      
}
