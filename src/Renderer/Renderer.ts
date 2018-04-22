import ClassNames from '../Config/ClassNames';
import root       from './Components/root';
import Dom        from './Dom';
import State from '../State/State';
import createDomElementFromHtml from '../Shared/Util/createDomElementFromHtml';

class Renderer {
    public static render(state: State, classNames: ClassNames): Dom {
        const html = root(state, classNames);
        const dom = new Dom();

        dom.root = createDomElementFromHtml(html) as HTMLDivElement;

        return Object.keys(dom).reduce((dom, ref) => {
            const element = dom.root.querySelector(`[ref="${ref}"]`);

            if (!element || ref === 'root') return dom;

            const value = dom[ref];

            element.removeAttribute('ref');

            if (value === null) {
                dom[ref] = element;
            } else {
                if (!Array.isArray(value)) dom[ref] = [value];

                dom[ref].push(element)
            }

            return dom;
        }, dom);
    }
}

export default Renderer;