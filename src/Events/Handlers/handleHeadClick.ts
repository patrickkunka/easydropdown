import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleHeadClick(e: MouseEvent, {state, actions, dom, config}: IHandlerParams): void {
    e.stopPropagation();

    if (state.isClosed) {
        actions.open(detectBodyCollision(dom, config), dom.optionHeight);

        dom.select.focus();
    } else {
        actions.close();
    }
}

export default handleHeadClick;