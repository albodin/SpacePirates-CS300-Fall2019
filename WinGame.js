//after finding the recipe, display message and restart the game.
function winGame(){
   makeModalMenu("Congratulations, you won the game!", {
      'Restart': () => {
      }
   },false)
   gameOver = true;
   restart();
}