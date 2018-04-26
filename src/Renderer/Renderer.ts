import ClassNames               from '../Config/ClassNames';
import closestParent            from '../Shared/Util/closestParent';
import createDomElementFromHtml from '../Shared/Util/createDomElementFromHtml';
import State                    from '../State/State';
import root                     from './Components/root';
import Dom                      from './Dom';
import domDiff                  from './domDiff';
import domPatch                 from './domPatch';

class Renderer {
    public classNames: ClassNames;
    public dom: Dom;

    constructor(classNames: ClassNames) {
        this.dom = new Dom();
        this.classNames = classNames;
    }

    public render(state: State, selectElement: HTMLSelectElement): Dom {
        const html = root(state, this.classNames);

        this.dom.root = createDomElementFromHtml(html) as HTMLDivElement;
        this.dom.select = selectElement;
        this.dom.form = closestParent(selectElement, 'form') as HTMLFormElement;

        this.mount(selectElement);

        return this.dom;
    }

    public update(state: State, key: string): void {
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
        this.dom.root.parentElement.replaceChild(this.dom.select, this.dom.root);
    }

    private mount(selectElement: HTMLSelectElement): void {
        const parent = selectElement.parentElement;

        if (!parent) throw new Error('[EasyDropDown] The provided `<select>` element must exist within a document');

        parent.replaceChild(this.dom.root, selectElement);

        Object
            .keys(this.dom)
            .reduce((localDom, ref) => {
                const selector = `[data-ref="${ref}"]`;
                const elements = localDom.root.querySelectorAll(selector);

                if (elements.length < 1 || ref === 'root') return localDom;

                const element = elements[0];

                if (ref === 'select') {
                    element.parentElement.replaceChild(selectElement, element);
                    selectElement.className = element.className;

                    return localDom;
                }

                const value = localDom[ref];

                if (value === null) {
                    localDom[ref] = element;
                } else if (Array.isArray(value)) {
                    Array.prototype.push.apply(value, elements);
                }

                return localDom;
            }, this.dom);
    }

    private syncSelectWithValue(value: string): void {
        if (this.dom.select.value === value) return;

        const event = new CustomEvent('change', {
            bubbles: true
        });

        this.dom.select.value = value;

        this.dom.select.dispatchEvent(event);
    }
}

export default Renderer;