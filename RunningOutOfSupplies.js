function checkSupplies() {
   if (supplies <= 0) {
      if (isRegularPlay) {
         restart();
         makeModalMenu('You are out of supplies. Game over!', {
            'Restart': () => {
            }
         },false)
         return false;
      }
   }
   return true;
}

function decrementSupplies(amount) {
   supplies = parseInt(document.getElementById("supplies").value);
   supplies -= amount;
   document.getElementById("supplies").value = supplies;
}