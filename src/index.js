document.addEventListener('DOMContentLoaded', () => {

    const screensDiv = document.querySelector('.screensDiv');
    const youWonH1 = document.querySelector('.youWonH1');
    const youLostH1 = document.querySelector('.youLostH1');
    const container = document.querySelector('.container');
    const correctWordSpan = document.getElementById('correctWordSpan');

    var mode = "add";

    var keysArray = [
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'
    ];

    var wordsArray = [
        "apple","blend","brick","charm","clasp","clean","climb","clock","cloud","craft","crisp","croak","crown","crush","dance","dealt","death","debut","decal","delay","doubt","dream","drift","drill","drink","drive","eager","early","earth","empty","equal","equip","error","event","every","exact","fable","faith","fancy","fault","favor","fence","fetch","fever","fiber","field","fight","final","flame","flour","fluid","focus","force","found","frame","fresh","front","frost","fruit","funny","giant","glaze","globe","glory","grace","grade","grasp","green","groan","group","guard","guess"
    ];

    var luckyWord = getLuckyWord();

    function getLuckyWord() {
        return wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
    }

    function checkAlphabet(pressedKey) {
        var result = 0;
        
        for (let i = 0; i < keysArray.length; i++) {
            if (keysArray[i] === pressedKey.toLowerCase()) {
                result += 1;
            }
        }

        if (result === 1) {
            return true;
        }
    }

    function getAllScreenButtonsWithTextAndNotDisabled () {
        
        const allScreenDivsNodeList = getAllScreenButtons();
        var onlyTextBtnArray = [];
        var checkOnlyFive = 0;
        
        for (let i = allScreenDivsNodeList.length-1; i > -1; i--) {
            
            if (checkOnlyFive < 5) {
                if (allScreenDivsNodeList[i].innerText.length > 0) {

                    if (allScreenDivsNodeList[i].disabled === false) {
                        onlyTextBtnArray += allScreenDivsNodeList[i].innerText;

                        checkOnlyFive++;
                    }
                }
            }
        }

        var reversedTextBtnArray = [];

        for (let i = onlyTextBtnArray.length-1; i > -1; i--) {
            reversedTextBtnArray += onlyTextBtnArray[i];
        }

        return reversedTextBtnArray;
    }

    function markIndex(currentValue, color) {

        const allScreenDivsNodeList = getAllScreenButtons();
        var checkOnlyFive = 0;
        
        for (let i = allScreenDivsNodeList.length-1; i > -1; i--) {
            
            if (checkOnlyFive < 5) {
                if (allScreenDivsNodeList[i].innerText.length > 0) {
                    
                    if (allScreenDivsNodeList[i].innerText === currentValue) {

                        allScreenDivsNodeList[i].style.backgroundColor = color;
                        allScreenDivsNodeList[i].style.boxShadow = "none";
                    }

                    checkOnlyFive++;
                }
            }
        }
    }

    function disableAllBtnsWithText() {
        
        const allScreenDivsNodeList = getAllScreenButtons();

        if (getAllScreenButtonsWithTextAndNotDisabled().length === 5) {
            for (let i = allScreenDivsNodeList.length-1; i > -1; i--) {
                if (allScreenDivsNodeList[i].textContent.length > 0) {
                    allScreenDivsNodeList[i].disabled = true;
                }
            }
        }
    }

    function answerIsCorrect() {
        mode = "ended";
        container.style.opacity = "0.6";
        container.style.pointerEvents = "none";

        youWonH1.style.display = "flex"; youWonH1.style.justifyContent = "center"; youWonH1.style.alignItems = "center";

        setTimeout(() => {
            location.reload();
        }, 8000);
    }

    function gameOver() {
        mode = "ended";
        container.style.opacity = "0.6";
        container.style.pointerEvents = "none";

        youLostH1.style.display = "flex"; youLostH1.style.justifyContent = "center"; youLostH1.style.alignItems = "center";
        
        correctWordSpan.innerText = `\n${luckyWord}`;

        setTimeout(() => {
            location.reload();
        }, 3500);
    }

    function checkResult() {

        const answer = getAllScreenButtonsWithTextAndNotDisabled();
        const allScreenBtns = getAllScreenButtons();
        
        if (answer.length === 5) {

            var correctChecks = 0;
            var sameCharCheck = 0;

            for (let i = 0; i < luckyWord.length; i++) {

                if (i > 0) {
                    if (answer[i] === answer[i-1]) {
                        sameCharCheck++;
                    }
                }

                if (luckyWord.includes(answer[i])) {
                    markIndex(answer[i], "#B59F3B")
                }

                if (answer[i] === luckyWord[i]) {
                    
                    markIndex(answer[i], "#538D4E");

                    correctChecks += 1;
                }
            }

            if (allScreenBtns[29].innerText.length > 0) {
                gameOver();
            }

            if (correctChecks === 5) {
                answerIsCorrect();
            }
        }
    }

    function changeUsedKeysColor() {

        const allScreenDivsNodeList = getAllScreenButtonsWithTextAndNotDisabled();
        const allKeysNodeList = getAllKeys();

        for (let i = 0; i < allKeysNodeList.length; i++) {

            if (allKeysNodeList[i].innerText.toUpperCase() === allScreenDivsNodeList[0] || allKeysNodeList[i].innerText.toUpperCase() === allScreenDivsNodeList[1] || allKeysNodeList[i].innerText.toUpperCase() === allScreenDivsNodeList[2] || allKeysNodeList[i].innerText.toUpperCase() === allScreenDivsNodeList[3] || allKeysNodeList[i].innerText.toUpperCase() === allScreenDivsNodeList[4]) {

                allKeysNodeList[i].style.backgroundColor = "grey";
            }
        }
    }

    function insertScreenDivs() {
        for (let i = 1; i < 31; i++) {

            screensDiv.insertAdjacentHTML("beforeend", 
            `
                <button class="screenDiv"></button>
            `);
        }
    }

    insertScreenDivs();

    function getAllScreenButtons() {
        return document.querySelectorAll('.screenDiv');
    }

    function getAllKeys() {

        return document.querySelectorAll('.key');
    }

    function addTextToScreen(clickedElement) {

        if (mode === "add") {
            const clickedElementTextContent = clickedElement;
            const allScreenDivsNodeList = getAllScreenButtons();
            const onlyTextBtns = getAllScreenButtonsWithTextAndNotDisabled();

            if (onlyTextBtns.length <= 4) {
                for (let i = 0; i < allScreenDivsNodeList.length; i++) {

                    if (allScreenDivsNodeList[i].innerText.length < 1) {
                        
                        allScreenDivsNodeList[i].style.backgroundColor = "grey";
        
                        allScreenDivsNodeList[i].innerText = clickedElementTextContent.toUpperCase();

                        break
                    }
                }
            }
        }

        else {
            return;
        }
    }

    function doBackspace(clickedElement) {

        const allScreenDivsNodeList = getAllScreenButtons();

        for (let i = allScreenDivsNodeList.length-1; i > -1; i--) {
            
            if (allScreenDivsNodeList[i].innerText.length > 0) {

                if (allScreenDivsNodeList[i].style.backgroundColor === "grey") {

                    if (allScreenDivsNodeList[i].disabled === false) {
                        allScreenDivsNodeList[i].style.backgroundColor = "#3A3A3C";

                        allScreenDivsNodeList[i].innerText = "";
                        break
                    }
                }

                else {
                    break
                }
            }
        }
    }

    document.addEventListener('keyup', (event) => {
        const pressedKey = event.key;

        if (checkAlphabet(pressedKey) === true) {
            addTextToScreen(pressedKey)
        }

        if (pressedKey === "Backspace") {
            doBackspace(pressedKey)
        }

        if (pressedKey === "Enter") {
            getAllScreenButtonsWithTextAndNotDisabled();

            checkResult();

            changeUsedKeysColor();

            disableAllBtnsWithText();
        }
    })

    document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.className === "key") {
            addTextToScreen(clickedElement.textContent.toUpperCase());
        }

        if (clickedElement.className === "backspace") {
            doBackspace(clickedElement);
        }

        if (clickedElement.className === "enter") {
            getAllScreenButtonsWithTextAndNotDisabled();

            checkResult();

            changeUsedKeysColor();

            disableAllBtnsWithText();
        }
    })
})