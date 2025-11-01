export function getInputElementText(id) {
    var inputElement = document.getElementById(id);
    if (inputElement == null) {
        throw Error(`Couldn't find input input element: ${id}`);
    }
    return inputElement.value;
}
export function getElement(id) {
    var inputElement = document.getElementById(id);
    if (inputElement == null) {
        throw Error(`Couldn't find input element: ${id}`);
    }
    return inputElement;
}
