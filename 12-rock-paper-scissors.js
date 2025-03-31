let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();


let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      document.querySelector('.js-auto-play-button').innerHTML = 'stop playing'
    }, 500);


    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play'
  }

}


document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });
document.querySelector('.js-reset-button')
  .addEventListener('click', () => {

    document.querySelector('.display-confirmation').innerHTML = 'Are you sure you want to reset the score? <button class="confirm-yes">Yes</button> <button class="confirm-no">No</button>';

    document.querySelector('.confirm-yes').addEventListener('click', ()=> {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      document.querySelector('.display-confirmation').innerHTML = '';
      updateScoreElement();
    });
  
    document.querySelector('.confirm-no').addEventListener('click', ()=> {
      document.querySelector('.display-confirmation').innerHTML = '';
      updateScoreElement();
    });


  });



document.querySelector('.js-auto-play-button')
  .addEventListener('click', (event) => {
   autoPlay();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if(event.key=== 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    document.querySelector('.display-confirmation').innerHTML = 'Are you sure you want to reset the score? <button class="confirm-yes">Yes</button> <button class="confirm-no">No</button>';

    document.querySelector('.confirm-yes').addEventListener('click', ()=> {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      document.querySelector('.display-confirmation').innerHTML = '';
      updateScoreElement();
    });
  
    document.querySelector('.confirm-no').addEventListener('click', ()=> {
      document.querySelector('.display-confirmation').innerHTML = '';
      updateScoreElement();
    });
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose';
    }
    else if (computerMove === 'paper') {
      result = 'You win';
    }
    else if (computerMove === 'scissors') {
      result = 'Tie';
    }
  }

  else if (playerMove === 'paper') {

    if (computerMove === 'rock') {
      result = 'You win';
    }
    else if (computerMove === 'paper') {
      result = 'Tie';
    }
    else if (computerMove === 'scissors') {
      result = 'You lose';
    }
  }

  else {

    if (computerMove === 'rock') {
      result = 'Tie';
    }
    else if (computerMove === 'paper') {
      result = 'You lose';
    }
    else if (computerMove === 'scissors') {
      result = 'You win';
    }
  }

  if (result === 'You win') {
    score.wins += 1;
  } else if (result === 'You lose') {
    score.losses += 1;
  } else { score.ties += 1 }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = ` You
<img src="images/${playerMove}-emoji.png" alt="" class="move-icons">
<img src="images/${computerMove}-emoji.png" alt="" class="move-icons">
Computer`

}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = ` wins: ${score.wins} losses: ${score.losses} ties: ${score.ties}`;

}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  }

  else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  }
  else {
    computerMove = 'scissors';
  }
  return computerMove;
}