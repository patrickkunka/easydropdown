import dispatchOpen   from '../../Shared/Util/dispatchOpen';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleHeadClick(e: MouseEvent, {state, actions, dom, config}: IHandlerParams): void {
    if (state.isUseNativeMode) return;

    e.stopPropagation();

    if (state.isClosed) {
        dispatchOpen(actions, config, dom);

        dom.select.focus();
    } else {
        actions.close();
    }
}

export default handleHeadClick;