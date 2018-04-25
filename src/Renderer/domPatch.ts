import AttributeChangeType from './Constants/AttributeChangeType';
import DomChangeType       from './Constants/DomChangeType';
import DiffCommand         from './DiffCommand';
import IAttributeChange    from './Interfaces/IAttributeChange';

function domPatch(node: Node, command: DiffCommand): Node {
    switch (command.type) {
        case DomChangeType.NONE:
            return node;
        case DomChangeType.REPLACE:
            node.parentElement.replaceChild(command.newNode, node);

            return command.newNode;
        case DomChangeType.INNER:
            if (node instanceof Text) {
                node.textContent = command.newTextContent;
            } else if (command.childCommands.length > 0) {
                command.childCommands.forEach((childCommand, i) => domPatch(node.childNodes[i], childCommand));
            } else if (node instanceof HTMLElement) {
                node.innerHTML = command.newInnerHtml;
            }

            return node;
        case DomChangeType.OUTER:
            patchAttributes(node as HTMLElement, command.attributeChanges);

            return node;
        case DomChangeType.FULL:
            if (command.childCommands.length > 0) {
                command.childCommands.forEach((childCommand, i) => domPatch(node.childNodes[i], childCommand));
            } else if (node instanceof HTMLElement && command.newInnerHtml !== '') {
                node.innerHTML = command.newInnerHtml;
            }

            patchAttributes(node as HTMLElement, command.attributeChanges);

            return node;
    }
}

function patchAttributes(el: HTMLElement, attributeChanges: IAttributeChange[]): void {
    let raf: (callback: FrameRequestCallback) => number = null;

    if (typeof window.requestAnimationFrame !== 'undefined') {
        raf = window.requestAnimationFrame;
    }

    attributeChanges.forEach(change => {
        if (raf && ['class', 'style'].indexOf(change.name) > -1) {
            raf(() => patchAttribute(el, change));
        } else {
            patchAttribute(el, change);
        }
    });
}

function patchAttribute(el: HTMLElement, change: IAttributeChange): void {
    switch (change.type) {
        case AttributeChangeType.ADD:
        case AttributeChangeType.EDIT:
            el.setAttribute(change.name, change.value);

            break;
        case AttributeChangeType.REMOVE:
            el.removeAttribute(change.name);

            break;
    }
}

export default domPatch;