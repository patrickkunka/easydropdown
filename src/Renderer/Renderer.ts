import root                     from '../Components/root';
import ClassNames               from '../Config/ClassNames';
import createDomElementFromHtml from '../Shared/Util/createDomElementFromHtml';
import State                    from '../State/State';

import Dom      from './Dom';
import domDiff  from './domDiff';
import domPatch from './domPatch';

class Renderer {
    public classNames: ClassNames;
    public dom: Dom;

    constructor(classNames: ClassNames) {
        this.dom = new Dom();
        this.classNames = classNames;
    }

    public render(state: State, selectElement: HTMLSelectElement): Dom {
        const html = root(state, this.classNames);
        const rootElement = createDomElementFromHtml(html) as HTMLDivElement;

        this.dom = new Dom();
        this.dom.root = rootElement;

        this.dom.option.length = this.dom.group.length = 0;

        Renderer.queryDomRefs(this.dom);

        this.injectSelect(selectElement);

        return this.dom;
    }

    public update(state: State, key?: keyof State): void {
        const nextHtml = root(state, this.classNames);
        const nextRoot = createDomElementFromHtml(nextHtml) as HTMLDivElement;
        const diffCommand = domDiff(this.dom.root, nextRoot);

        domPatch(this.dom.root, diffCommand);

        if (key === 'selectedIndex') {
            this.syncSelectWithValue(state.value);
        }
    }

    public destroy(): void {
        this.dom.select.classList.remove(this.classNames.select);

        try {
            this.dom.root.parentElement.replaceChild(this.dom.select, this.dom.root);
        } catch (err) { /**/ }
    }

    private injectSelect(selectElement: HTMLSelectElement): void {
        const parent = selectElement.parentElement;
        const tempSelect = this.dom.select;

        if (!parent) throw new Error('[EasyDropDown] The provided `<select>` element must exist within a document');

        parent.replaceChild(this.dom.root, selectElement);

        tempSelect.parentElement.replaceChild(selectElement, tempSelect);
        selectElement.className = this.classNames.select;
        selectElement.setAttribute('aria-hidden', 'true');

        this.dom.select = selectElement;
    }

    private syncSelectWithValue(value: string): void {
        if (this.dom.select.value === value) return;

        const event = new CustomEvent('change', {
            bubbles: true
        });

        this.dom.select.value = value;

        this.dom.select.dispatchEvent(event);
    }

    public static queryDomRefs(dom: Dom, keys: string[] = Object.keys(dom)): Dom {
        return keys
            .reduce((localDom: Dom, ref: string) => {
                const selector = `[data-ref~="${ref}"]`;
                const elements = localDom.root.querySelectorAll(selector);

                if (elements.length < 1 || ref === 'root') return localDom;

                const element = elements[0];
                const value = localDom[ref];

                if (value === null) {
                    localDom[ref] = element;
                } else if (Array.isArray(value)) {
                    Array.prototype.push.apply(value, elements);
                }

                return localDom;
            }, dom);
    }
}

export default Renderer;