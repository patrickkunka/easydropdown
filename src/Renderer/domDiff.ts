import AttributeChangeType  from './Constants/AttributeChangeType';
import DomChangeType        from './Constants/DomChangeType';
import DiffCommand          from './DiffCommand';
import IAttributeChange     from './Interfaces/IAttributeChange';

const CHILD_MARKER_SELECTOR = '#cortex-children';

interface IPartialDiffCommand {
    type: DomChangeType;
    attributeChanges: IAttributeChange[];
}

/**
 * Recursively diffs the structure of two equivalent DOM nodes, and
 * returns a `DiffCommand` object representing a tree of any differences.
 */

const domDiff = (prev: Node, next: Node, index: number = null): DiffCommand => {
    let totalChildNodes = -1;

    const command = new DiffCommand();

    command.index = index;

    if (prev instanceof Text && next instanceof Text) {
        // Text nodes

        if (prev.textContent === next.textContent) {
            command.type = DomChangeType.NONE;
        } else {
            command.type = DomChangeType.INNER;
            command.newTextContent = next.textContent;
        }
    } else if (prev instanceof HTMLElement && next instanceof HTMLElement) {
        // HTML Elements

        if (prev.tagName !== next.tagName) {
            // The tag has changed between versions, so assume a
            // complete replacement of the element (further
            // diffing would be redundant)

            command.type = DomChangeType.REPLACE;
            command.newNode = next;
        } else if (prev.outerHTML === next.outerHTML) {
            // `outerHTML` is equal, therefore both elements identical
            // and no change

            command.type = DomChangeType.NONE;
        } else if (prev.innerHTML === next.innerHTML) {
            // `innerHTML` is equal but `outerHTML` is not, so a change
            // in one or more attributes has occurred

            Object.assign(command, diffAttributeChanges(prev, next));
        } else if (prev.innerHTML !== next.innerHTML) {
            // `innerHTML` is not equal. A change to the element's inner content
            // has occurred, and possibly a change to one or more attributes.

            Object.assign(command, diffAttributeChanges(prev, next));

            if (command.attributeChanges.length > 0) {
                // An attribute change has ocurred, so change is type "FULL"
                command.type = DomChangeType.FULL;
            } else {
                // Only a change to inner content has ocurred, so change is
                // type "INNER"

                command.type = DomChangeType.INNER;
            }

            if ((totalChildNodes = prev.childNodes.length) > 0 && totalChildNodes === next.childNodes.length) {
                // The element has children, and has the same number of children
                // as previous version

                let hasPassedChildMarker = false;

                // Recursively diff each child

                for (let i = 0, childNode; (childNode = prev.childNodes[i]); i++) {
                    // For nodes after the child marker, count their indices
                    // from the end of the parent

                    const childIndex = hasPassedChildMarker ? i - totalChildNodes : i;

                    if (childNode instanceof HTMLElement && childNode.matches(CHILD_MARKER_SELECTOR)) {
                        // Once the child marker is passed, set flag

                        hasPassedChildMarker = true;
                    }

                    command.childCommands.push(domDiff(childNode, next.childNodes[i], childIndex));
                }
            } else {
                // Each version has a different number of children, so
                // perform a brute force `innerHTML` replace.

                // TODO: this could be improved with an additional algorithm to
                // intelligently detect where child elements have been added
                // or removed

                command.newInnerHtml = next.innerHTML;
            }
        }
    } else {
        // Change from HTML element to text node or vice versa
        command.type = DomChangeType.REPLACE;
        command.newNode = next;
    }

    return command;
};

/**
 * Diffs the attributes of two equivalent nodes, and returns a
 * partially-mapped `DiffCommand`-like object.
 */

const diffAttributeChanges = (prev: HTMLElement, next: HTMLElement): IPartialDiffCommand => {
    // Obtain the highest number of attributes on either element

    const totalAttributes = Math.max(prev.attributes.length, next.attributes.length);
    const attributesMap   = {};
    const undef           = void(0);
    const attributeChanges: IAttributeChange[] = [];

    // Iterate from 0 up to the max

    for (let i = 0; i < totalAttributes; i++) {
        // Obtain references to the attribute at that index
        // for each element

        const attr1 = prev.attributes[i];
        const attr2 = next.attributes[i];

        // If an attribute exists at that index, but has not been
        // added to the map yet, initialise it on the map as an
        // empty array

        if (attr1 && attributesMap[attr1.name] === undef) {
            attributesMap[attr1.name] = [];
        }

        if (attr2 && attributesMap[attr2.name] === undef) {
            attributesMap[attr2.name] = [];
        }

        // Map the value of that attribute for each element into the map.
        // The value for an attribute is a tuple in the form of an array.
        // Previous value is added at index 0, and next value at index 1.

        if (attr1) attributesMap[attr1.name][0] = attr1.value;
        if (attr2) attributesMap[attr2.name][1] = attr2.value;

        // An example map:
        // {
        //    class: ['modal', 'modal modal__open']
        // }

        // Typically, the above values will be added to the same key at the
        // same time, although if attributes appear in different orders,
        // this may happen out of step. The full set of attributes must
        // therefore by mapped before diffing.
    }

    const keys = Object.keys(attributesMap);

    if (keys.length > 1) {
        // Sort the map's keys alphabetically (for predictable testing)

        keys.sort();
    }

    // Iterate through each key in the map (each attribute), and make
    // edits as required

    for (let i = 0, key; (key = keys[i]); i++) {
        const attr = attributesMap[key];

        let change: IAttributeChange;

        // If no change, continue

        if (attr[0] === attr[1]) continue;

        if (attr[0] === undef) {
            // The attribute did not exist on the previous element

            change = {
                type: AttributeChangeType.ADD,
                name: key,
                value: attr[1]
            };
        } else if (attr[1] === undef) {
            // The attribute does not exist on the next element

            change = {
                type: AttributeChangeType.REMOVE,
                name: key,
                value: ''
            };
        } else {
            // The attribute's value has changed

            change = {
                type: AttributeChangeType.EDIT,
                name: key,
                value: attr[1]
            };
        }

        // Push mapped and coerced `AttributeChange` object into array of changes

        attributeChanges.push(change);
    }

    return {
        type: DomChangeType.OUTER,
        attributeChanges
    };
};

export default domDiff;