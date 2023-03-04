function getElement(identity) {
    return document.querySelector(identity);
}

function addListener(element, eventType, callBack) {
    element.addEventListener(eventType,callBack);
}