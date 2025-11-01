export function getInputElementText(id: string): string {
    var inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement == null) {
        throw Error(`Couldn't find input input element: ${id}`);
    }

    return inputElement.value;
}

export function getElement(id: string): HTMLElement {
    var inputElement = document.getElementById(id);
    if (inputElement == null) {
        throw Error(`Couldn't find input element: ${id}`);
    }

    return inputElement;
}
