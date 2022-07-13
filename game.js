var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//$("body").click(function(){nextSequence()});

//Detects whether the game has been started by a keypress and calls the nextSequence function
$(document).keypress(function() {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

//Detects when a button is clicked, assigns the attribute to a variable and then adds to the userClickedPattern array
// $("button").on("click", function() {
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Calls checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1)
});

// Function to create next colour in the sequence and save it to the gamePattern array
function nextSequence() {
  // Reset the userClickedPattern to empty
  userClickedPattern = [];

  //Increment the level and change the title of the page to reflect the new level
  level++;
  $("#level-title").html("Level " + level);

  //Generate a random number and use that to select the colour from the buttonColours array
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //Animates the button to fadeout and then fadeback in
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //PLays the sounds associated with the button
  playSound(randomChosenColour);
}

// Function to play the sound associated with the colour passed into it.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate the press of the button. Adds the pressed class and then removes it 100ms later
function animatePress(currentSelection) {
  $("#" + currentSelection).addClass("pressed");
  setTimeout(() => {$("#" + currentSelection).removeClass("pressed");}, 100);
}

// Function to compare the users choice to the stored answer
function checkAnswer(currentLevel) {
  //Check to see if the users last answer matches the games lasts answer
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Check to see if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {nextSequence()}, 1000);
    }
  }
  else {
    // If the users answer is wrong
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    // Applies the game-over class to the whole body and then removes it after 200ms - causes the screen to flash
    $("body").addClass("game-over");
    setTimeout(() => {$("body").removeClass("game-over");}, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    startOver();
  }
}

// Function to reset the information - called if user gets the sequence wrong
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
