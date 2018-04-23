import AttributeChangeType from './Constants/AttributeChangeType';
import DomChangeType       from './Constants/DomChangeType';
import DiffCommand         from './DiffCommand';
import IAttributeChange    from './Interfaces/IAttributeChange';

/**
 * Recursively patches a given node according to a provided
 * `DiffCommand` object. Returns a reference to the updated
 * or replaced node.
 */

function domPatch(node: Node, command: DiffCommand): Node {
    switch (command.type) {
        case DomChangeType.NONE:
            // No change

            return node;
        case DomChangeType.REPLACE:
            // Replaces the node with an entirely different element

            node.parentElement.replaceChild(command.newNode, node);

            return command.newNode;
        case DomChangeType.INNER:
            // Change to contents of node

            if (node instanceof Text) {
                // Node is a simple text node with no chidren, replace its
                // `textContent` value

                node.textContent = command.newTextContent;
            } else if (command.childCommands.length > 0) {
                // Node is an HTML element and command has childCommands,
                // recursively apply each child patch

                command.childCommands.forEach((childCommand, i) => domPatch(node.childNodes[i], childCommand));
            } else if (node instanceof HTMLElement) {
                // No child commands present, replace the element's
                // `innerHTML` value

                node.innerHTML = command.newInnerHtml;
            }

            return node;
        case DomChangeType.OUTER:
            // Change to one or more attributes of the element only

            patchAttributes(node as HTMLElement, command.attributeChanges);

            return node;
        case DomChangeType.FULL:
            // Change to contents of element and one or more attributes

            if (command.childCommands.length > 0) {
                // If child commands are present, recursively apply
                // each child patche

                command.childCommands.forEach((childCommand, i) => domPatch(node.childNodes[i], childCommand));
            } else if (node instanceof HTMLElement && command.newInnerHtml !== '') {
                // No child commands present, replace the element's
                // `innerHTML` value

                node.innerHTML = command.newInnerHtml;
            }

            // Patch element's attributes

            patchAttributes(node as HTMLElement, command.attributeChanges);

            return node;
    }
}

/**
 * Iterates through attribute changes, patching each attribute.
 *
 * Defers patching of `class` and `style` attributes using
 * `requestAnimationFrame` to allow for DOM reflow *after*
 * inner HTML changes and therefore accomodate any resulting
 * CSS transitios.
 */

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

/**
 * Changes, adds or removes an attribute from a given element.
 */

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