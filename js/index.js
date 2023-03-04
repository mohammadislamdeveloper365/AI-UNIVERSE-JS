let openMenu = getElement('.ai-universe--navbar-open-menu');
let closeMenu = getElement('.ai-universe--navbar-close-menu');
let mainMenu = getElement('.ai-universe--navbar-main-menu');

addListener(openMenu,'click',showMainMenu);
addListener(closeMenu,'click',closeMainMenu);

function showMainMenu() {
    mainMenu.style.display = 'flex';
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
}

function closeMainMenu() {
    mainMenu.style.display = 'none';
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
}