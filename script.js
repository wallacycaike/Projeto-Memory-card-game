const cards = document.querySelectorAll(".card"),
  startButton = document.querySelector(".start-game"),
  restartButton = document.querySelector(".restart-game"),
  selectDifficulties = document.querySelector(".select-difficulties"),
  enableCards = document.querySelector(".cards"),
  timeText = document.querySelector(".time"),
  secondsLeft = document.querySelector(".time #seconds"),
  winMensage = document.createElement("span");

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timer;

function flipCard(e) {
  let clickedCard = e.target;
  if (clickedCard !== cardOne && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector("img").src,
      cardTwoImg = cardTwo.querySelector("img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matchedCard++;
    if (matchedCard === 8) {
      // setTimeout(() => {

      // }, 1000);
      selectDifficulties.value = "null";
      startButton.classList.remove("disabled");
      selectDifficulties.classList.remove("disabled");

      winMensage.innerText = "VOCÊ GANHOU";
      winMensage.classList.add("time-green");

      timeText.innerText = `Para iniciar novamente selecione uma dificuldade e clique em "Iniciar"!`;
      timeText.insertAdjacentElement("afterend", winMensage);
      clearInterval(timer);
      enableCards.classList.add("disabled");
      shuffleCard();
      console.log(winMensage.textContent);
      return;
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    return (disableDeck = false);
  }

  setTimeout(() => {
    cardOne.classList.add("shake");
    cardTwo.classList.add("shake");
  }, 400);

  setTimeout(() => {
    cardOne.classList.remove("shake", "flip");
    cardTwo.classList.remove("shake", "flip");
    cardOne = cardTwo = "";
    disableDeck = false;
  }, 1200);
}

function shuffleCard() {
  matchedCard = 0;
  cardOne = cardTwo = "";
  disableDeck = false;
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

  cards.forEach((card, index) => {
    card.classList.remove("flip");
    card.classList.remove("shake");
    let imgTag = card.querySelector("img");
    imgTag.src = `images/img-${arr[index]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

cards.forEach((card) => {
  //   card.classList.add("flip");
  card.addEventListener("click", flipCard);
});

const initTimer = (maxTimer) => {
  clearInterval(timer);
  timer = setInterval(() => {
    timeText.classList.remove("time-red");
    timeText.classList.remove("time-green");
    secondsLeft.classList.remove("time-red");
    if (maxTimer > 0) {
      maxTimer--;

      if (maxTimer <= 10) {
        secondsLeft.classList.add("time-red");
      }

      secondsLeft.innerText = `${maxTimer}s`;
      timeText.innerText = "Tempo restante: ";
      timeText.insertAdjacentElement("beforeend", secondsLeft);
      return;
      // secondsLeft.innerText = maxTimer;
      // timeText.innerText = `Tempo Restante: `;
    }
    selectDifficulties.value = "null";
    enableCards.classList.add("disabled");
    secondsLeft.classList.remove("time-red");
    startButton.classList.remove("disabled");
    selectDifficulties.classList.remove("disabled");
    shuffleCard();
    timeText.innerText = `O tempo acabou, Tente novamente.\n Selecione uma dificuldade e clique em "Iniciar"!\n`;
    return clearInterval(timer);
  }, 1000);
};

startButton.addEventListener("click", function (difficultie) {
  winMensage.remove();
  difficultie = selectDifficulties.value;
  shuffleCard();

  if (difficultie === "facil") {
    initTimer(60);
    startButton.classList.add("disabled");
    selectDifficulties.classList.add("disabled");
    enableCards.classList.remove("disabled");
    console.log("Modo fácil ativado!");
  } else if (difficultie === "medio") {
    initTimer(40);
    startButton.classList.add("disabled");
    selectDifficulties.classList.add("disabled");
    enableCards.classList.remove("disabled");
    console.log("Modo Médio ativado!");
  } else if (difficultie === "dificil") {
    initTimer(25);
    startButton.classList.add("disabled");
    selectDifficulties.classList.add("disabled");
    enableCards.classList.remove("disabled");
    console.log("Modo Difícil ativado!");
  } else {
    timeText.classList.add("time-red");
    timeText.innerText = "Selecione uma dificuldade!";
  }
});

restartButton.addEventListener("click", function () {
  location.reload();
});
