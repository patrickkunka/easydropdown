import Dom from '../../Renderer/Dom';

function detectIsScrollable(dom: Dom): boolean {
    const {scrollHeight} = dom.itemsList;
    const {offsetHeight} = dom.body;

    if (scrollHeight > offsetHeight) {
        return true;
    }

    return false;
}

export default detectIsScrollable;