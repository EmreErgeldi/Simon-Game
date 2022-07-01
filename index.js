$("button").attr("disabled", "disabled");
let level = 1;
let number;
let gamePattern = [];
let playerPattern = [];
let canPlay = true;

$("html").keyup( async () => {
  if (canPlay) {
    canPlay = false;
    $(".header").text(`Level ${level}`);
    defineColor();
    fadeGamePattern();
  }
});

$("button").mousedown((e) =>{
  $(e.target).css("border", "12px solid black");
});
$("button").mouseup( async (e) =>{
  $(e.target).css("border", "8px solid black");
  playSound(e.target.classList[0]);
  playerPattern.push(e.target.classList[0]);
  console.log(gamePattern + "\n" + playerPattern);
  if (gamePattern.length === playerPattern.length) {
    await checkAnswer();
  }
});

function playSound(color) {
  const audio = new Audio(`./sounds/${color}.mp3` );
  audio.play();
}

function getRandomNumber(){
  return Math.floor((Math.random() * 4) + 1);
}

async function fadeSquare(color) {
  $(`.${color}`).fadeOut();
  $(`.${color}`).fadeIn();
}

function defineColor() {
  number = getRandomNumber();
  switch (number) {
    case 1:
      gamePattern.push("yellow");
      break;
    case 2:
      gamePattern.push("green");
      break;
    case 3:
      gamePattern.push("blue");
      break;
    case 4:
      gamePattern.push("red");
      break;
  }
}

fadeGamePattern = async () => {
  $("button").attr("disabled", "disabled");
  for (let i = 0; i < gamePattern.length; i++) {
    await sleep(800);
    fadeSquare(gamePattern[i]);
  }
  await sleep(800);
  $("button").removeAttr("disabled");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


checkAnswer = async () => {
  let check = 0;
  for (let i = 0; i < gamePattern.length; i++) {
    if (gamePattern[i] === playerPattern[i]) {
      check++;
    }
  }
  if (check === gamePattern.length) {
    level++;
    playerPattern = [];
    $(".header").text(`Level ${level}`);
    defineColor();
    fadeGamePattern();
  } else {
    $(".header").text(`Game Over! (Press a key to restart.)`);
    $("button").attr("disabled", "disabled");
    $("html").keyup(() => {
      location.reload();
    })
    const audio = new Audio(`./sounds/wrong.mp3` );
    audio.play();
  }
}