document.addEventListener('DOMContentLoaded', () => {

    const mainBody = document.querySelector('.mainBody');
    const screensDiv = document.querySelector('.screensDiv');
    const keysDiv = document.querySelector('.keysDiv');

    for (let i = 1; i < 26; i++) {

        screensDiv.insertAdjacentHTML("beforeend", 
        `
            <div class="screenDiv"></div>
        `);
    }

    const keysArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']

    for (let i = 0; i < keysArray.length; i++) {
        keysDiv.insertAdjacentHTML("beforeend",
        `
            <div class="key">${keysArray[i]}</div>
        `)
    }
})