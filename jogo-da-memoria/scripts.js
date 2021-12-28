const cards = document.querySelectorAll(".memory-card"); //seleciona todos valores memory-card

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard; //armazena valor 1 e 2

function flipCard() {
  //função virar cartas
  if (lockBoard) return; //bloquear campo para virar somente 2 cartas
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true; //se não houver carta virada condição true
    firstCard = this;
    return;
  }

  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  //função check
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    disableCards();
    return;
  }

  unflipCards();
}

function disableCards() {
  //caso cartas formarem par - função a ser chamada
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  //caso pares errados - função a ser chamada
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  //função reset após rodada
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  //função embaralhar
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
