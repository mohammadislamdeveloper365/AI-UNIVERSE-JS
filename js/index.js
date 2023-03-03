const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');
const mainMenu = document.querySelector('.main-menu');

openMenu.addEventListener('click',function () {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
    closeMenu.style.display = ''
})

closeMenu.addEventListener('click',function () {
    mainMenu.style.display = 'none';
})