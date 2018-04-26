import Dom      from '../../Renderer/Dom';
import IActions from '../../State/Interfaces/IActions';
import State    from '../../State/State';

function setGeometry(state: State, actions: IActions, dom: Dom): void {
    const {scrollHeight, offsetHeight} = dom.body;

    if (scrollHeight > offsetHeight && !state.isScrollable) {
        actions.makeScrollable();
    } else if (scrollHeight <= offsetHeight && state.isScrollable) {
        actions.makeUnscrollable();
    }

    actions.setOptionHeight(dom.optionHeight);
}

export default setGeometry;