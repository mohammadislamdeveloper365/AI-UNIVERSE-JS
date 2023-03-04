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


function loadAiDetails(dataLimit) {
    let url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>showCard(data,dataLimit))
}

function createAiCard(data) {
    let cardsContainer = getElement('.ai-universe-main-cards-container');
    let aiCardContainer = createElement('div','d-flex','flex-column','col-md-4','mb-2','p-5');
    let imgContainer = createElement('div','mb-2');
    let img = createElement('img','api-universe-img-card');
    let cardHeader1 = createElement('h3','mb-2');
    let listContainer = createElement('ol','mb-2','card-list-container');
    let horizontalRow = createElement('hr','mb-2');
    let cardHeader2 = createElement('h3','mb-2');
    let dateContainer = createElement('div','mb-2');
    let calendarIcon = createElement('i','fa-regular', 'fa-calendar');
    let dateSpan = createElement('span','px-3');

    cardHeader1.innerText = "Feature";
    img.src = data.image;
    img.height = '3rem';
    imgContainer.append(img);
    let lists = data.features;
    for(let item of lists) {
        let list = createElement('li');
        list.innerText = item;
        listContainer.append(list);
    }

    cardHeader2.innerText = data.name;
    dateSpan.innerText = data.published_in;
    dateContainer.append(calendarIcon,dateSpan)
    aiCardContainer.append(imgContainer,cardHeader1,listContainer,horizontalRow,cardHeader2,dateContainer);
    cardsContainer.append(aiCardContainer);
   
}


function showCard(data,dataLimit) {
    console.log(data.data)
    let {tools} = data.data ?? [];
    console.log(tools.length)
    if(dataLimit < tools.length) {
        console.log(tools,dataLimit)
        tools = tools.slice(0,6);
        console.log(tools)
        for(let item of tools) {
            console.log(item)
            createAiCard(item);
        }
        let body = document.body;
        let btnBody = createElement('div','text-center');
        let showMoreBtn = createElement('button','btn','btn-danger','mb-3');
        showMoreBtn.innerText = 'Show More';
        btnBody.append(showMoreBtn);
        body.append(btnBody);
    }
    
    
}
loadAiDetails(6)
createAiCard();
