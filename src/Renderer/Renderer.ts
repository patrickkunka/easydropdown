import ClassNames               from '../Config/ClassNames';
import createDomElementFromHtml from '../Shared/Util/createDomElementFromHtml';
import State                    from '../State/State';
import root                     from './Components/root';
import Dom                      from './Dom';

class Renderer {
    public static render(state: State, classNames: ClassNames, selectElement: HTMLSelectElement): Dom {
        const html = root(state, classNames);
        const dom = new Dom();

        dom.root = createDomElementFromHtml(html) as HTMLDivElement;
        dom.select = selectElement;

        const parent = selectElement.parentElement;

        if (!parent) throw new Error('[EasyDropDown] The provided `<select>` element must exist within a document');

        parent.replaceChild(dom.root, selectElement);

        return Object
            .keys(dom)
            .reduce((localDom, ref) => {
                const element = localDom.root.querySelector(`[ref="${ref}"]`);

                if (!element || ref === 'root') return localDom;

                if (ref === 'select') {
                    element.parentElement.replaceChild(selectElement, element);
                    selectElement.className = element.className;

                    return localDom;
                }

                const value = localDom[ref];

                element.removeAttribute('ref');

                if (value === null) {
                    localDom[ref] = element;
                } else if (Array.isArray(value)) {
                    value.push(element);
                }

                return localDom;
            }, dom);
    }

    public static destroy(dom: Dom, selectElement: HTMLSelectElement): void {
        dom.root.parentElement.replaceChild(dom.select, dom.root);

        dom.select.className = '';
    }

    public static update(dom: Dom, classNames: ClassNames, state: State): void {
        Renderer.destroy(dom, dom.select);

        Object.assign(dom, Renderer.render(state, classNames, dom.select));
    }
}

export default Renderer;