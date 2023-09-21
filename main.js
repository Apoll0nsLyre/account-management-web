const menuPage = document.querySelector('.menu-page');
const mainPage = document.querySelector('.main-page');
const homePage = document.querySelector('.home');
const transactionButton = document.querySelector('.transaction-button');
const homeButton = document.querySelector('#home-button');

homeButton.addEventListener('click', toggleMenu);

transactionButton.addEventListener('click', toggleMenu);

function toggleMenu() {
    menuPage.classList.toggle('hidden');
    mainPage.classList.toggle('hidden');
    homePage.classList.toggle('hidden');
}
    