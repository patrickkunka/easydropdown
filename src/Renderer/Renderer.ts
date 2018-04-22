import ClassNames               from '../Config/ClassNames';
import createDomElementFromHtml from '../Shared/Util/createDomElementFromHtml';
import State                    from '../State/State';
import root                     from './Components/root';
import Dom                      from './Dom';

class Renderer {
    public static render(state: State, classNames: ClassNames): Dom {
        const html = root(state, classNames);
        const dom = new Dom();

        dom.root = createDomElementFromHtml(html) as HTMLDivElement;

        return Object.keys(dom).reduce((localDom, ref) => {
            const element = localDom.root.querySelector(`[ref="${ref}"]`);

            if (!element || ref === 'root') return localDom;

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
}

export default Renderer;