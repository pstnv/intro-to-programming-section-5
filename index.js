const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const checkInput = document.getElementById('check-input');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;
let min = 1;
let max = 100;

// Returns a random number from min (inclusive) to max (exclusive)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
    hideAllMessages();

    // Check if empty input
    if (!guessInput.value) {
        checkInput.style.display = '';
        checkInput.innerHTML = 'Enter a number.';

        resetButton.style.display = 'none';
        return;
    }

    // Get value from guess input element
    const guess = parseInt(guessInput.value, 10);
    guessInput.value = '';

    // Check if min < value < max
    if (guess < min) {
        checkInput.style.display = '';
        checkInput.innerHTML = `Must be greater than ${min}. Try again.`;

        resetButton.style.display = 'none';
        return;
    }
    if (guess > max - 1) {
        checkInput.style.display = '';
        checkInput.innerHTML = `Must be less than ${max}. Try again.`;

        resetButton.style.display = 'none';
        return;
    }

    attempts = attempts + 1;
    resetButton.style.display = '';

    if (guess === targetNumber) {
        numberOfGuessesMessage.style.display = '';
        numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> You made ${attempts} ${attempts === 1 ? 'guess' : 'guesses'}.`;

        correctMessage.style.display = '';

        submitButton.disabled = true;
        guessInput.disabled = true;

        return;
    }


    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining.`;


    if (attempts === maxNumberOfAttempts) {
        submitButton.disabled = true;
        guessInput.disabled = true;
        maxGuessesMessage.style.display = '';
        return;
    }

    if (guess < targetNumber) {
        tooLowMessage.style.display = '';
    } else {
        tooHighMessage.style.display = '';
    }

}

function hideAllMessages() {
    for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
        messages[elementIndex].style.display = 'none';
    }
}

function setup() {
    // Get random number
    targetNumber = getRandomNumber(min, max);
    console.log(`target number: ${targetNumber}`);

    // Reset number of attempts
    attempts = 0;

    // Enable the input and submit button
    submitButton.disabled = false;
    guessInput.disabled = false;

    hideAllMessages();
    resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();