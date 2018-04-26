function createDomElementFromHtml(html: string): Element {
    const temp = document.createElement('div');

    temp.innerHTML = html;

    return temp.firstElementChild;
}

export default createDomElementFromHtml;