let all_btns = document.querySelectorAll(".input");
let ttl_run = 0;
let run = 0;

let ball_left = 6;
let scoreboard = document.querySelector(".scoreboard");
let ball_div = document.querySelector(".ball");
let score = document.querySelector(".score");
let ttl_run_display = document.querySelector(".total");
let pr_over_run_display = document.querySelector(".per_over");

let newInningButton = document.getElementById("newIning");
let winScorePrint = document.querySelector(".winScorePrint");
let new_over;
let over_count = 0;

wicket = 10;

let team = {
  team1_run: 0,
  team2_run: 0,
  team1_wicket: 0,
  team2_wicket: 0,
};

let teamNo = 1;

let winner;

let totalOver = prompt("how many over match...?");
let over = totalOver;

function btnclick() {
  if (ball_left >= 1 && wicket > 0) {
    let btn = this;
    let value = btn.getAttribute("value");
    let in_txt = btn.innerText;

    let point = document.createElement("h3");
    point.textContent = in_txt;
    point.classList.add("points");

    scoreboard.appendChild(point);
    run = run + +value;
    ball_left--;

    if (btn.innerText == "wide") {
      ball_left++;
    }

    if (btn.innerText == "No ball") {
      ball_left++;
    }

    if (btn.innerText == "wicket") {
      wicket--;
    }
  }

  if (ball_left == 0) {
    over_count++;
    over--;
    all_btns.forEach((btn) => {
      btn.classList.add("disabled");
    });

    if (over > 0) {
      new_over = document.createElement("div");
      new_over.textContent = "New over";
      new_over.classList.add("input");
      new_over.id = "newOver";
      ball_div.appendChild(new_over);

      new_over.addEventListener("click", overChange);

      ball_left = 6;

      for (btn of all_btns) {
        btn.addEventListener("click", btnclick);
      }
    }

    ttl_run = ttl_run + run;

    ttl_run_display.innerText = `total run : ${ttl_run} wicket : ${
      10 - wicket
    }`;

    let over_run = document.createElement("h4");
    over_run.textContent = `Team ${teamNo}, Over ${over_count} : ${run} run `;
    pr_over_run_display.appendChild(over_run);
    run = 0;
  }

  if (wicket == 0 || over == 0) {
    all_btns.forEach((btn) => {
      btn.classList.add("disabled");
    });

    ttl_run_display.innerText = `total run : ${ttl_run} wicket : ${
      10 - wicket
    }`;

    let over_run = document.createElement("h4");

    switch (teamNo) {
      case 1:
        team.team1_run = ttl_run;
        team.team1_wicket = 10 - wicket;
        break;
      case 2:
        team.team2_run = ttl_run;
        team.team2_wicket = 10 - wicket;
        break;
    }
    ++teamNo;

    if (teamNo == 2) {
      let newIning = document.createElement("div");
      newIning.textContent = "New Inning";
      newIning.classList.add("input");
      newInningButton.appendChild(newIning);

      newIning.addEventListener("click", newIningStart);
      resetInningScore();
    }

    if (teamNo == 3) {
      winnerPrint();
    }
  }
  if (teamNo == 2 && ttl_run + run > team.team1_run) {
    team.team2_run = ttl_run + run;
    // teamNo++;

    winnerPrint();
  }
}
for (btn of all_btns) {
  btn.addEventListener("click", btnclick);
}

let newOver = document.getElementById("newOver");

function overChange() {
  run = 0;
  scoreboard.innerText = "";

  new_over.remove();
  all_btns.forEach((btn) => {
    btn.classList.remove("disabled");
  });
}

function newIningStart() {
  pr_over_run_display.innerText = "";
  ttl_run_display.innerText = "";
  newInningButton.innerText = "";

  all_btns.forEach((btn) => {
    btn.classList.remove("disabled");
  });

  for (btn of all_btns) {
    btn.addEventListener("click", btnclick);
  }
}

function winnerPrint() {
  btnDisable();
  if (totalOver > 1) {
    new_over.remove();
  }

  ttl_run_display.innerText = `total run : ${ttl_run + run} wicket : ${
    10 - wicket
  }`;
  if (team.team1_run > team.team2_run) {
    winner = document.createElement("h3");
    winner.textContent = `Team : 1 is Win by ${
      team.team1_run - team.team2_run
    } Run`;
    winner.style.color = " green";
    newInningButton.appendChild(winner);
  } else if (team.team2_run > team.team1_run) {
    winner = document.createElement("h3");
    winner.textContent = `Team : 2 is Win by ${
      team.team2_run - team.team1_run
    } Run`;
    winner.style.color = " green";
    newInningButton.appendChild(winner);
  } else if ((team.team2_run = team.team1_run)) {
    winner = document.createElement("h3");
    winner.textContent = `Match Draw`;
    winner.style.color = " green";
    newInningButton.appendChild(winner);
  }

  let team1Score = document.createElement("h5");
  let team2Score = document.createElement("h5");

  team1Score.textContent = `Team 1 score : ${team.team1_run}/${team.team1_wicket}`;
  team2Score.textContent = `Team 2 score : ${team.team2_run}/${team.team2_wicket}`;

  winScorePrint.appendChild(team1Score);
  winScorePrint.appendChild(team2Score);
}

function btnDisable() {
  all_btns.forEach((btn) => {
    btn.classList.add("disabled");
  });
}

function resetInningScore() {
  over = totalOver;
  ball_left = 6;
  ttl_run = 0;
  run = 0;
  over_count = 0;
  wicket = 10;
  scoreboard.innerText = "";
}
