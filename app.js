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

function getPlayerName(e) {
  e.preventDefault();

  const user1 = document.getElementById("player1").value;
  const user2 = document.getElementById("player2").value;

  if (!user1.value || !user2.value) {
    console.log("Hi!");
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
              <h1>Player ${index}</h1>
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
    '<button id="play" class="btn btn-outline-primary mt-2" onclick="result()">Play</button>';
  app.innerHTML = template;
  getValues();
}

function getValues() {
  const player1 = document.querySelectorAll(`#player1 button`);
  const player2 = document.querySelectorAll(`#player2 button`);
  player1.forEach((e) => {
    e.addEventListener("click", function (e) {
      if (lastOption1) {
        lastOption1.classList.remove("selected1");
      }
      lastOption1 = this;
      players[0].selected = this.value;
      this.classList.toggle("selected1");
    });
  });

  player2.forEach((e) => {
    e.addEventListener("click", function (e) {
      if (lastOption2) {
        lastOption2.classList.remove("selected2");
      }
      lastOption2 = this;
      players[1].selected = this.value;
      this.classList.toggle("selected2");
    });
  });
}

function result() {
  const user1 = players[0].selected;
  const user2 = players[1].selected;

  switch (calcResult(user1, user2)) {
    case 0:
      app.innerHTML = `<p class="results"> Too bad, it's a tie!</p>`;
      break;
    case 1:
      app.innerHTML = `<p class="results"> Congratulations! ${players[0].name} is the winner! </p>`;
      break;
    case 2:
      app.innerHTML = `<p class="results"> Congratulations! ${players[1].name} is the winner! </p>`;
      break;
    default:
      app.innerHTML = "Default";
      break;
  }
  app.innerHTML += `<button id="play" class="btn btn-outline-primary mt-2" onclick="startGame()">Play again</button>`;
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
