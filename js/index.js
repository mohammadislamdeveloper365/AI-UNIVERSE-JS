let openMenu = getElement('.ai-universe--navbar-open-menu');
let closeMenu = getElement('.ai-universe--navbar-close-menu');
let mainMenu = getElement('.ai-universe--navbar-main-menu');
let sortByDateBtn = getElement('#sort-btn');


addListener(sortByDateBtn,'click',function(){
    loadAiDetailsByDate(6);   
})

addListener(openMenu,'click',showMainMenu);
addListener(closeMenu,'click',closeMainMenu);

function showMainMenu() {
    mainMenu.style.top = '0';
    openMenu.style.display = 'none';
    closeMenu.style.display = 'block';
}

function closeMainMenu() {
    mainMenu.style.top = '-120%';
    openMenu.style.display = 'block';
    closeMenu.style.display = 'none';
}


function loadAiDetails(dataLimit) {
    let url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>displayCard(data,dataLimit))
    .catch(error=>{
        getElement('#default-error').style.display = 'block';
        loadSpinner(false);
        console.log(error);
    })
}

function loadAiDetailsByDate() {
    let url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        displayCardByDate(data,6)
    })
    .catch(error=>{
        getElement('#default-error').style.display = 'block';
        loadSpinner(false);
        console.log(error);
    });
}

function createAiCard(data) {
    let aiCardContainer = createElement('div','d-flex','flex-column','col-md-3','mb-2','p-5','ai-universe-main-card');
    let imgContainer = createElement('div','mb-2');
    let img = createElement('img','api-universe-img-card');
    let cardHeader1 = createElement('h3','mb-2');
    let listContainer = createElement('ol','mb-2','card-list-container');
    let horizontalRow = createElement('hr','mb-2');
    let cardHeader2 = createElement('h3','mb-2');
    let dateContainer = createElement('div','mb-2');
    let calendarIcon = createElement('i','fa-regular', 'fa-calendar');
    let dateSpan = createElement('span','px-3');

    aiCardContainer.setAttribute('data-bs-toggle','modal');
    aiCardContainer.setAttribute('data-bs-target','#exampleModal');
    
    cardHeader1.innerText = "Feature";
    img.src = data.image ?? "";
    img.height = '3rem';
    imgContainer.append(img);
    let lists = data.features;
    for(let item of lists) {
        let list = createElement('li');
        list.innerText = item;
        listContainer.append(list);
    }

    cardHeader2.innerText = data.name ?? '';
    dateSpan.innerText = data.published_in ?? '';
    dateContainer.append(calendarIcon,dateSpan)
    aiCardContainer.append(imgContainer,cardHeader1,listContainer,horizontalRow,cardHeader2,dateContainer);
    return aiCardContainer;
   
}

function displayCardByDate(data,dataLimit) {
    loadSpinner(true);
    let aiCardsContainer = getElement('.ai-universe-main-cards-container');
    let aiCard;
    aiCardsContainer.innerText = '';
    let {tools} = data.data ?? [];

    tools.sort(function(a,b){
        return new Date(b.published_in) - new Date(a.published_in);
    });
    
    if(dataLimit < tools.length) { 

        partialTools = tools.slice(0,dataLimit);
        for(let item of partialTools) {
            aiCard = createAiCard(item);
            aiCardsContainer.append(aiCard);
        }

        loadSpinner(false);
        
        const showMoreBtn = getElement('#show-more-btn');
        showMoreBtn.style.display = 'inline-block';
        
        addListener(showMoreBtn,'click',function showMore() {
            loadSpinner(true);
            aiCardsContainer.innerText = '';
            moreTools = tools.slice(0);

            moreTools.sort(function(a,b){
                return new Date(b.published_in) - new Date(a.published_in);
            });

            for(let item of moreTools) {
                aiCard = createAiCard(item);
                aiCardsContainer.append(aiCard);
            }

            loadSpinner(false);

        })
    }
    

    else {
        for(let item of tools) {
            aiCard = createAiCard(item);
            aiCardsContainer.append(aiCard);
        }

        loadSpinner(false);
    }

    

}

function displayCard(data,dataLimit) {
    loadSpinner(true);
    let cardsContainer = getElement('.ai-universe-main-cards-container');
    let aiCard;
    let {tools} = data.data ?? [];

    if(dataLimit < tools.length) {
        partialTools = tools.slice(0,dataLimit);
        for(let item of partialTools) {
            aiCard = createAiCard(item);
            cardsContainer.append(aiCard);
        }

        loadSpinner(false);
        const showMoreBtn = getElement('#show-more-btn');
        showMoreBtn.style.display = 'inline-block';
        addListener(showMoreBtn,'click',function showMore() {
            cardsContainer.innerText = '';
            loadSpinner(true);
            moreTools = tools.slice(0);
            
            for(let item of moreTools) {
                aiCard = createAiCard(item);
                cardsContainer.append(aiCard);
            }

            loadSpinner(false);
        })
    }
    

    else {
        for(let item of tools) {
            aiCard = createAiCard(item);
            cardsContainer.append(aiCard);
        }
        loadSpinner(false);
    }
}

function loadSpinner(isLoading) {
    let spinner = getElement('.loading-spinner');
    if(!isLoading)
    spinner.style.display = "none";
}

loadAiDetails(6);

