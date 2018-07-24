//Returns a number from 0 to max, max exclusive.
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomColours() {
  //Randomly generates 6 colors and pushes them onto the array
  //num: number of colours to be generated
  let colors = [];
  for (var i = 0; i < gameMode; i++) {
    red = getRandomInt(256);
    green = getRandomInt(256);
    blue = getRandomInt(256);
    aString = "rgb(" + red + ", " + green + ", " + blue + ")"
    colors.push(aString);
  }
  return colors;
}

function changeAllToColor(someColor) {
  //Function is called when win condition is reached. Changes all squares to be same colour as the winning colour
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = someColor;
  }
  header.style.backgroundColor = someColor;
}

function newGame() {
  resetButton.textContent = 'New Colours'
  statusText.textContent = "";
  colors = generateRandomColours(); //Generates new colours
  correctColor = colors[getRandomInt(gameMode)]; //Choose a random winning colour
  RGBTitle.textContent = correctColor; //Display the rbg code on the title
  header.style.backgroundColor = "steelblue"; //Changes header to default color
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      //Changes the background color of the squares to the ones stored in colors array
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block"; //Confusing: block causes element to appear
    } else {
      squares[i].style.display = "none"; //None causes element to disappear
    }
  }
}

function addEventsToButtons() {
  for (var i = 0; i < squares.length; i++) {
    //Adds the clicking event: If correct colour/ wrong colour.
    squares[i].addEventListener('click', function() {
      if (this.style.backgroundColor === correctColor) {
        statusText.textContent = "You won!";
        changeAllToColor(correctColor);
        resetButton.textContent = "Play again?"
      } else {
        this.style.backgroundColor = '#232323';
        statusText.textContent = "Try Again";
      }
    })
  }
  //Add the clicking event for the reset button.
  resetButton.addEventListener('click', function() {
    newGame()
  });
  easyButton.addEventListener('click', function() {
    this.classList.add('selected');
    hardButton.classList.remove('selected');
    gameMode = 3;
    newGame(); //launch a new game but with 3 colours only
  });
  hardButton.addEventListener('click', function() {
    this.classList.add('selected');
    easyButton.classList.remove('selected');
    gameMode = 6;
    newGame(); //launch a new game
  });
};


let header = document.querySelector('h1');
let squares = document.querySelectorAll('.square');
let statusText = document.querySelector('#statusMsg');
let RGBTitle = document.querySelector('h1 span');
let resetButton = document.querySelector('div button');
let easyButton = document.querySelector('#easyButton');
let hardButton = document.querySelector('#hardButton');
let colors;
let correctColor;
let gameMode = 6; //Hard = 6, Easy = 3;

newGame();
addEventsToButtons();