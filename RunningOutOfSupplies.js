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

function decrementSupplies(amount) {
   supplies = parseInt(document.getElementById("supplies").value);
   supplies -= amount;
   document.getElementById("supplies").value = supplies;
}