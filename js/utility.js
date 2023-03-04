function createElement(tagName,...classes) {
    let ele = document.createElement(tagName);
    for(let name of classes) {
        ele.classList.add(name);
    }
    
    return ele;
}

function getElement(identity) {
    return document.querySelector(identity);
}

function getElementValue(identity,isInput) {
    return isInput ? getElement(identity).value : getElement(identity).innerText;
}

function addListener(element, eventType, callBack) {
    element.addEventListener(eventType,callBack);
}