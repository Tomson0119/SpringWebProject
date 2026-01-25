let htmlElementCache: Map<string, HTMLElement> = new Map<string, HTMLElement>();

export function getInputElementText(id: string): string {
    var inputElement = getElementInternal(id) as HTMLInputElement;
    if (inputElement == null) {
        throw Error(`Couldn't find input input element: ${id}`);
    }

    return inputElement.value;
}

export function getElement(id: string): HTMLElement {
    var inputElement = getElementInternal(id);
    if (inputElement == null) {
        throw Error(`Couldn't find input element: ${id}`);
    }

    return inputElement;
}

function getElementInternal(id: string): HTMLElement | null {
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
