// create new variable name randomNumber and assign it a random number between 1 - 100
let randomNumber = Math.floor(Math.random() * 100) + 1;
// create new constants and assign to html elements matching class name
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

/* create new variable `guessCount` and assign it a value of 1;
create variable `resetButton` and initialise it for now */
let guessCount = 1;
let resetButton;

// create function 'checkGuess'
function checkGuess() {
  // constant userGuess assigned to the value entered into .guessField
  // Number() constructor checks that value is a number
  const userGuess = Number(guessField.value);
  /* conditional - if number of guesses equals 1 (i.e is the player's first go)
   then make `guesses` text content display the following string: */
  if (guessCount === 1) {
    guesses.textContent = "Previous guesses: ";
  }
  // append the current value of `userGuess` to the end of `guesses` paragraph with a space
  guesses.textContent += userGuess + " ";

  // conditional - if the user's guess is equal to `randomNumber`
  if (userGuess === randomNumber) {
    /* display congratulations text, set green background and clear the contents of `lowOrHigh`
    then run function to set game over */
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();
    /* if user's guess count is equal to 10, display a game over message
    and clear the contents of `lowOrHigh` */
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();
    // conditional - if the user didn't guess correctly
  } else {
    // show alternative text and background colour
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    // if their guess is too low
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
      // if their guess is too high
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }

  // increment guessCount by 1, clear contents of the guess field and focus it again
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

// event listener for checkGuess function
guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
