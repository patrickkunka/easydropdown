import merge from 'helpful-merge';

import AttributeChangeType  from './Constants/AttributeChangeType';
import DomChangeType        from './Constants/DomChangeType';
import IAttributeChange     from './Interfaces/IAttributeChange';
import IPatchCommand        from './Interfaces/IPatchCommand';
import PatchCommand         from './PatchCommand';

function domDiff(prev: Node, next: Node): PatchCommand {
    let totalChildNodes = -1;

    const command = new PatchCommand();

    if (prev instanceof HTMLSelectElement) {
        command.type = DomChangeType.NONE;

        return command;
    }

    if (prev instanceof Text && next instanceof Text) {
        if (prev.textContent === next.textContent) {
            command.type = DomChangeType.NONE;
        } else {
            command.type = DomChangeType.INNER;
            command.newTextContent = next.textContent;
        }
    } else if (prev instanceof HTMLElement && next instanceof HTMLElement) {
        if (prev.tagName !== next.tagName) {
            command.type = DomChangeType.REPLACE;
            command.newNode = next;
        } else if (prev.outerHTML === next.outerHTML) {
            command.type = DomChangeType.NONE;
        } else if (prev.innerHTML === next.innerHTML) {
            merge(command, diffAttributeChanges(prev, next));
        } else {
            merge(command, diffAttributeChanges(prev, next));

            if (command.attributeChanges.length > 0) {
                command.type = DomChangeType.FULL;
            } else {
                command.type = DomChangeType.INNER;
            }

            if ((totalChildNodes = prev.childNodes.length) > 0 && totalChildNodes === next.childNodes.length) {
                for (let i = 0, childNode; (childNode = prev.childNodes[i]); i++) {
                    command.childCommands.push(domDiff(childNode, next.childNodes[i]));
                }
            } else {
                command.newInnerHtml = next.innerHTML;
            }
        }
    } else {
        command.type = DomChangeType.REPLACE;
        command.newNode = next;
    }

    return command;
}

function diffAttributeChanges(prev: HTMLElement, next: HTMLElement): IPatchCommand {
    const totalAttributes = Math.max(prev.attributes.length, next.attributes.length);
    const attributesMap   = {};
    const undef           = void(0);
    const attributeChanges: IAttributeChange[] = [];

    for (let i = 0; i < totalAttributes; i++) {
        const attr1 = prev.attributes[i];
        const attr2 = next.attributes[i];

        if (attr1 && attributesMap[attr1.name] === undef) {
            attributesMap[attr1.name] = [];
        }

        if (attr2 && attributesMap[attr2.name] === undef) {
            attributesMap[attr2.name] = [];
        }

        if (attr1) attributesMap[attr1.name][0] = attr1.value;
        if (attr2) attributesMap[attr2.name][1] = attr2.value;
    }

    const keys = Object.keys(attributesMap);

    if (keys.length > 1) {
        keys.sort();
    }

    for (let i = 0, key; (key = keys[i]); i++) {
        const attr = attributesMap[key];

        const change: IAttributeChange = {
            type: null,
            name: key,
            value: null
        };

        if (attr[0] === attr[1]) continue;

        if (attr[0] === undef) {
            change.type = AttributeChangeType.ADD;
            change.value = attr[1];
        } else if (attr[1] === undef) {
            change.type = AttributeChangeType.REMOVE,
            change.value = '';
        } else {
            change.type = AttributeChangeType.EDIT,
            change.value = attr[1];
        }

        attributeChanges.push(change);
    }

    return {
        type: DomChangeType.OUTER,
        attributeChanges
    };
}

export default domDiff;