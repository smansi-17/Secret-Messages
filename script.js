let methods = [];

const morseCodeMap = {
  "A": ".-",    "B": "-...",  "C": "-.-.",  "D": "-..",
  "E": ".",     "F": "..-.",  "G": "--.",   "H": "....",
  "I": "..",    "J": ".---",  "K": "-.-",   "L": ".-..",
  "M": "--",    "N": "-.",    "O": "---",   "P": ".--.",
  "Q": "--.-",  "R": ".-.",   "S": "...",   "T": "-",
  "U": "..-",   "V": "...-",  "W": ".--",   "X": "-..-",
  "Y": "-.--",  "Z": "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--",
  "4": "....-", "5": ".....", "6": "-....", "7": "--...",
  "8": "---..", "9": "----."
};

function convertToMorse(input) {
  input = input.toUpperCase();
  let output = '';
  for (let char of input) {
    if (char === ' ') {
      output += ' / ';
    } else if (morseCodeMap[char]) {
      output += morseCodeMap[char] + ' ';
    }
  }
  return output.trim();
}

function convertToCaesarCipher(input) {
  let output = '';
  for (let char of input) {
    if (char.match(/[a-z]/i)) {
      const isUpper = char === char.toUpperCase();
      const base = isUpper ? 65 : 97;
      const shiftedChar = String.fromCharCode(((char.charCodeAt(0) - base + 1) % 26) + base);
      output += shiftedChar;
    } else {
      output += char;
    }
  }
  return output;
}

function convertToNumeric(input) {
  let output = '';
  for (let char of input.toUpperCase()) {
    if (char >= 'A' && char <= 'Z') {
      output += (char.charCodeAt(0) - 64) + '.';
    } else if (char === ' ') {
      output += ' ';
    }
  }
  return output.trim();
}

function convertToBinary(input) {
  return input
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

function convertToReverse(input) {
  return input
    .split(' ')
    .map(word => word.split('').reverse().join(''))
    .join(' ');
}

function convertText() {
  const input = document.getElementById('textInput').value;
  const method = document.getElementById('methodSelect').value;
  let result = '';

  switch (method) {
    case 'morse':
      result = convertToMorse(input);
      break;
    case 'caesar':
      result = convertToCaesarCipher(input);
      break;
    case 'numeric':
      result = convertToNumeric(input);
      break;
    case 'binary':
      result = convertToBinary(input);
      break;
    case 'reverse':
      result = convertToReverse(input);
      break;
    default:
      result = 'Unknown method';
  }

  document.getElementById('output').textContent = result;
}

function updateDescription() {
  const method = document.getElementById('methodSelect').value;
  const descriptionBox = document.getElementById('description');
  const found = methods.find(m => m.id === method);

  if (found) {
    descriptionBox.textContent = found.description;

    // Animate with SplitText
    const split = new SplitText(descriptionBox, { type: "words,chars" });
    gsap.from(split.chars, {
      duration: 0.6,
      opacity: 0,
      y: 20,
      stagger: 0.02,
      ease: "back.out(1.7)"
    });
  } else {
    descriptionBox.textContent = '';
  }
}


async function loadMethods() {
  try {
    const response = await fetch('methods.json');
    methods = await response.json();

    const select = document.getElementById('methodSelect');
    select.innerHTML = '';

    methods.forEach(method => {
      const option = document.createElement('option');
      option.value = method.id;
      option.textContent = method.name;
      select.appendChild(option);
    });

    updateDescription();
  } catch (error) {
    console.error('Failed to load methods:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('methodSelect').addEventListener('change', updateDescription);
  loadMethods();
});


const bgMusic = document.getElementById("bg-music");

// Example: Pause after 10 seconds
setTimeout(() => {
  bgMusic.pause();
}, 10000);

// Example: Change volume
bgMusic.volume = 0.5; // Volume is from 0.0 to 1.0