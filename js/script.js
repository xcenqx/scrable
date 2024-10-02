const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
contentBox = document.querySelector(".container .content"),
startArea = document.querySelector(".startArea"),
scoreArea = document.querySelector(".score"),
messageError = document.querySelector('.messageError'),
messageArea = document.querySelector(".messageArea");  // Dodane pole do wyświetlania wiadomości

let correctWord, timer;
let score = 0;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        // Czas minął - wyświetlamy wiadomość
        messageArea.style.color = "red";
        messageArea.innerHTML = `Czas minął! <b>${correctWord.toUpperCase()}</b> jest pasującym wyrazem`;
        endGame();
    }, 1000);
}

const start = () => {
    contentBox.style.display = "block";
    startArea.style.display = "none";
    initGame();
}

const endGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    messageError.style.color = "red";
    messageError.innerHTML = `Czas minął! Przegrałeś! :(`;
}

const winGame = () => {
    clearInterval(timer);
    contentBox.style.display = "none";
    startArea.style.display = "block";
    messageError.style.color = "green";
    messageError.innerHTML = `<b>Gratulacje, WYGRAŁEŚ!!!</b>`;
}

const initGame = () => {
    messageArea.innerHTML = "";  // Czyścimy wiadomość
    messageError.innerHTML = "";
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    scoreArea.innerHTML = score;

    if(score > 9) {
        winGame();
    }
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();

    if(!userWord) { 
        messageArea.style.color = "orange";
        return messageArea.innerHTML = `Proszę wpisać słowo, aby sprawdzić!`;
    }

    if(userWord !== correctWord) { 
        if(score >= 1) {
            score--;
            scoreArea.innerHTML = score;
        }
        messageArea.style.color = "red";
        return messageArea.innerHTML = `Oops! <b>${userWord}</b> nie jest poprawnym wyrazem`;
    } else {
        messageArea.style.color = "green";
        messageArea.innerHTML = `Gratulacje! <b>${correctWord.toUpperCase()}</b> jest poprawnym wyrazem`;
        score++;
    }

    setTimeout(initGame, 1000);
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
