import Dom      from '../../Renderer/Dom';
import IActions from '../../State/Interfaces/IActions';
import State    from '../../State/State';

import detectIsScrollable from './detectIsScrollable';

function setGeometry(state: State, actions: IActions, dom: Dom): void {
    if (!dom.body) return;

    const isScrollable = detectIsScrollable(dom);

    if (isScrollable && !state.isScrollable) {
        actions.makeScrollable();
    } else if (!isScrollable && state.isScrollable) {
        actions.makeUnscrollable();
    }

    actions.setOptionHeight(dom.optionHeight);
}

export default setGeometry;