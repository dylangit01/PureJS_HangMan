const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

const displayWord = () => {
  // in this function, the letters show based on selectedWord, but with the condition that this letter also within
  // correctLetters array, so the position is fixed by selectedWord already, just need to decide if showing or not
  wordEl.innerHTML = `
  ${selectedWord.split('').map(letter => `
  <span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
  </span>
  `).join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You Won! 🤩';
    popup.style.display = 'flex';
  }

};


// Wrong letters update
const updateWrongLettersEl = () => {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} 
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if(index < errors){
      part.style.display = 'block'
    } else part.style.display = 'none';

    if(errors === figureParts.length){
      finalMessage.innerText = 'Unfortunately! You Lost! 😔';
      popup.style.display = 'flex';
    }

  })
};

// PlayAgain button:
const playAgain =() => {
  playAgainBtn.addEventListener('click', e => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none'

  })
};


// Show notification
const showNotification = () => {
  notification.classList.add('show');

  setTimeout(_ => notification.classList.remove('show'), 1000)
};


// Keydown letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        console.log(correctLetters);

        displayWord();
      } else showNotification()
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl()

      } else showNotification()
    }
  }

});


displayWord();
playAgain();
