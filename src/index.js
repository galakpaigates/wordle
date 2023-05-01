document.addEventListener('DOMContentLoaded', () => {

    const mainBody = document.querySelector('.mainBody');
    const screensDiv = document.querySelector('.screensDiv');
    const keysDiv = document.querySelector('.keysDiv');
    const backspaceImg = document.querySelector('.backspaceImg');
    backspaceImg.draggable = false;

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

    function addTextToScreenDiv(clickedElement) {

        const clickedElementTextContent = clickedElement.textContent.toUpperCase();
        const allScreenDivsNodeList = getAllScreenButtons();

        for (let i = 0; i < allScreenDivsNodeList.length; i++) {

            if (allScreenDivsNodeList[i].innerText.length < 1) {
                allScreenDivsNodeList[i].style.transform = "rotateY(360deg)";
                allScreenDivsNodeList[i].style.backgroundColor = "#538D4E";

                allScreenDivsNodeList[i].innerText = clickedElementTextContent;
                break
            }
        }
    }

    function doBackspace(clickedElement) {

        const allScreenDivsNodeList = getAllScreenButtons();

        for (let i = allScreenDivsNodeList.length-1; i > -1; i--) {
                
            if (allScreenDivsNodeList[i].innerText.length > 0) {

                allScreenDivsNodeList[i].style.transform = "rotateY(360deg)";
                allScreenDivsNodeList[i].style.backgroundColor = "#3A3A3C";

                allScreenDivsNodeList[i].innerText = "";
                break
            }
        }
    }

    document.addEventListener('click', (event) => {
        const clickedElement = event.target;

        if (clickedElement.className === "key") {
            addTextToScreenDiv(clickedElement);
        }

        if (clickedElement.className === "backspaceImg") {
            doBackspace(clickedElement);
        }
    })
})