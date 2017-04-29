// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayPowerPellets();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
}

function displayPowerPellets() {
  console.log('\n\nPower-Pellets: ' + powerPellets +'');
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellets');
  }
  if (inky.edible === false) {
    console.log('(1) Eat Inky (inedible)');
  } else if (inky.edible === true) {
    console.log('(1) Eat Inky (edible)');
  }
  if (blinky.edible === false) {
    console.log('(2) Eat Blinky (inedible)');
  } else if (blinky.edible === true) {
    console.log('(2) Eat Blinky (edible)');
  }
  if (pinky.edible === false) {
    console.log('(3) Eat Pinky (inedible)');
  } else if (pinky.edible === true) {
    console.log('(3) Eat Pinky (edible)');
  }
  if (clyde.edible === false) {
    console.log('(4) Eat Clyde (inedible)');
  } else if (clyde.edible === true) {
    console.log('(4) Eat Clyde (edible)');
  }
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  // console.log(inky.edible);
  score += 10;
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
  lives -= 1;
  console.log('\nAIYAH! You were killed by ' + ghost.name + ' the ' + ghost.colour + ' ghost');
} else if (ghost.edible === true) {
    score += 200;
    console.log('\nWooo get it girl! You ate ' + ghost.name + ' the ' + ghost.character + ' ghost');
      pacLives()
    }
}

function pacLives() {
  if (lives < 0) {
    process.exit();
  }
}

function eatPowerPellet() {
  console.log('\nPOWER PELLET!');
  score += 50;
  powerPellets -= 1;
  ghosts.forEach(function(ghost) {
  ghost.edible = true;
})
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      break;
    } else {
      console.log('\nNo More Pellets!');
    };
      break;
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 600); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nBye Felicia!\n');
});
