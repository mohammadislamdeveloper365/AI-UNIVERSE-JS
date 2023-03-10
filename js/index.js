let openMenu = getElement('.ai-universe--navbar-open-menu');
let closeMenu = getElement('.ai-universe--navbar-close-menu');
let mainMenu = getElement('.ai-universe--navbar-main-menu');
let sortByDateBtn = getElement('#sort-btn');


addListener(sortByDateBtn,'click',function(){
    console.log("Sort by date");
    loadAiDetailsByDate(6);
    console.log("data loading completed")
    
})

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

function loadAiDetailsByDate(dataLimit=0) {
    let url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(response=>response.json())
    .then(data=>{
        console.log(data)
        showCardByDate(data,dataLimit)
    });
}

function createAiCard(data) {
    let cardsContainer = getElement('.ai-universe-main-cards-container');
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
    aiCardContainer.innerHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
        </div>
   </div>
    `
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
    cardsContainer.append(aiCardContainer);
   
}

function showCardByDate(data,dataLimit) {
    console.log("show card")
    let aiCardsContainer = getElement('.ai-universe-main-cards-container');
    aiCardsContainer.innerText = '';
    loadSpinner(true);
    let {tools} = data.data ?? [];

    tools.sort(function(a,b){
        return new Date(b.published_in) - new Date(a.published_in);
    });
    console.log(tools)
    if(dataLimit >= 6 && dataLimit < tools.length) { 

        partialTools = tools.slice(0,dataLimit);
        for(let item of partialTools) {
            createAiCard(item);
        }

        loadSpinner(false);
        
        let showMoreBtn = getElement('#show-more-btn');
        showMoreBtn.style.display = 'inline-block';
        
        addListener(showMoreBtn,'click',function showMore() {
            loadSpinner(true);
            moreTools = tools.slice(6);

            moreTools.sort(function(a,b){
                return new Date(b.published_in) - new Date(a.published_in);
            });

            for(let item of moreTools) {
                createAiCard(item);
            }

            loadSpinner(false);

        })
    }
    

    else {
        tools = tools.slice(0,dataLimit);
        for(let item of tools) {
            createAiCard(item);
        }

        loadSpinner(false);
    }

    

}

function showCard(data,dataLimit) {
    loadSpinner(true);
    let {tools} = data.data ?? [];

    if(dataLimit >= 6 && dataLimit < tools.length) {
        partialTools = tools.slice(0,dataLimit);
        for(let item of partialTools) {
            console.log(item)
            createAiCard(item);
        }

        loadSpinner(false);
        let showMoreBtn = getElement('#show-more-btn');
        showMoreBtn.style.display = 'inline-block';
        addListener(showMoreBtn,'click',function showMore() {
            loadSpinner(true);
            moreTools = tools.slice(6);
            
            for(let item of moreTools) {
                console.log(item)
                createAiCard(item);
            }

            loadSpinner(false);
        })
    }
    

    else {
        tools = tools.slice(0,dataLimit);
        for(let item of tools) {
            createAiCard(item);
        }
        loadSpinner(false);
    }
}

function loadSpinner(isLoading) {
    let spinner = getElement('.loading-spinner');
    if(!isLoading)
    spinner.style.display = "none";
}

loadAiDetails(6)
createAiCard();
