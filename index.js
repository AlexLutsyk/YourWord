const getWord = fetch(
  'https://random-word-api.herokuapp.com/word?lang=en',
).then(res => {
  return res.json();
});

const searchWordBtn = document.querySelector('.button');
const inputName = document.querySelector('.input');
const form = document.querySelector('.form');
const outputText = document.querySelector('.output-text');

form.addEventListener('submit', onButtonWordClick);

const localName = localStorage.getItem('name');
const localWord = localStorage.getItem('word');
if (localName) {
  inputName.value = localName;
}
outputText.innerHTML = `${localName}, here is your word: ${localWord.toUpperCase()}`;
searchWordBtn.textContent = `YOUR WORD - ${localWord.toUpperCase()}`;

function onButtonWordClick(event) {
  event.preventDefault();

  const userName = event.currentTarget.name.value;
  localStorage.setItem('name', userName);

  if (userName === '') {
    alert('Enter Your Name Please!');
  } else {
    getWord
      .then(word => {
        localStorage.setItem('word', word[0]);
        outputText.innerHTML = `${userName}, here is your word: ${word[0].toUpperCase()}`;
        searchWordBtn.textContent = `YOUR WORD - ${word[0].toUpperCase()}`;
      })
      .catch(err => {
        console.log(err);
      });

    form.removeEventListener('submit', onButtonWordClick);
  }
}
