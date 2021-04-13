const rock = "rock";
const paper = "paper";
const scissors = "scissors";

const tie = 0;
const win = 1;
const lost = 2;
let players = [
  {
    selected: rock,
  },
  {
    selected: scissors,
  },
];
let lastOption1;
let lastOption2;

document.addEventListener("submit", getPlayerName);

const app = document.getElementById("app");
const alert = document.getElementById("alert");

function getPlayerName(e) {
  e.preventDefault();

  const user1 = document.getElementById("player1").value;
  const user2 = document.getElementById("player2").value;
  if (user1.trim() == "" || user2.trim() == "") {
    alert.classList.remove("hide");
    setTimeout(() => {
      alert.classList.add("hide");
    }, 3000);
    alert.innerHTML = "Enter your name, please";
    return;
  }
  players[0].name = user1;
  players[1].name = user2;
  startGame();
}

function startGame() {
  let template = "";
  for (let index = 1; index <= players.length; index++) {
    template += `
        <div id="player${index}">
              <h1  class="mb-4 mt-2">Player ${index}</h1>
                <button id="rock${index}" type="button" value="${rock}">
                  <img src="img/rock.svg" />
                </button>
                <button id="paper${index}" type="button" value="${paper}">
                  <img src="img/paper.svg" />
                </button>
                <button id="scissors${index}" type="button" value="${scissors}">
                  <img src="img/scissors.svg" />
                </button>
          </div>
          `;
  }
  template +=
    '<button id="play" class="btn btn-outline-primary mt-5" onclick="result()">Play</button>';
  app.innerHTML = template;
  getValues();
}

function getValues() {
  const player1 = document.querySelectorAll(`#player1 button`);
  const player2 = document.querySelectorAll(`#player2 button`);
  player1.forEach((e) => {
    e.addEventListener("click", function (e) {
      if (lastOption1) {
        lastOption1.classList.remove("selected");
      }
      lastOption1 = this;
      players[0].selected = this.value;
      this.classList.toggle("selected");
    });
  });

  player2.forEach((e) => {
    e.addEventListener("click", function (e) {
      if (lastOption2) {
        lastOption2.classList.remove("selected");
      }
      lastOption2 = this;
      players[1].selected = this.value;
      this.classList.toggle("selected");
    });
  });
}

function result() {
  const user1 = players[0].selected;
  const user2 = players[1].selected;

  let template = '<div class="result__container">';
  switch (calcResult(user1, user2)) {
    case 0:
      template += `<p class="results"> Too bad, it's a tie!</p>`;
      break;
    case 1:
      template += `<p class="results"> Congratulations! <span>${players[0].name}</span> is the winner! </p>`;
      break;
    case 2:
      template += `<p class="results"> Congratulations! <span>${players[1].name}</span> is the winner! </p>`;
      break;
    default:
      template += "Default";
      break;
  }
  template += `<button id="play" class="btn btn-outline-primary" onclick="redirect()">Play again</button></div>`;
  app.innerHTML = template;
}

function redirect() {
  window.location.href = "";
}

function calcResult(user1, user2) {
  if (user1 === user2) {
    return tie;
  } else if (user1 === rock) {
    if (user2 === paper) return lost;
    if (user2 === scissors) return win;
  } else if (user1 === paper) {
    if (user2 === scissors) return lost;
    if (user2 === rock) return win;
  } else if (user1 === scissors) {
    if (user2 === rock) return lost;
    if (user2 === paper) return win;
  }
}
