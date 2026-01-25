let htmlElementCache = new Map();
export function getInputElementText(id) {
    var inputElement = getElementInternal(id);
    if (inputElement == null) {
        throw Error(`Couldn't find input input element: ${id}`);
    }
    return inputElement.value;
}
export function getElement(id) {
    var inputElement = getElementInternal(id);
    if (inputElement == null) {
        throw Error(`Couldn't find input element: ${id}`);
    }
    return inputElement;
}
function getElementInternal(id) {
    let element = htmlElementCache.get(id);
    if (element == null) {
        let newElement = document.getElementById(id);
        if (newElement == null) {
            return null;
        }
        htmlElementCache.set(id, newElement);
        element = newElement;
    }
    return element;
}
