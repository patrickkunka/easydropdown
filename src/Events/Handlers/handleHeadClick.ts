import dispatchOpen     from '../../Shared/Util/dispatchOpen';
import isMobilePlatform from '../../Shared/Util/isMobilePlatform';
import IHandlerParams   from '../Interfaces/IHandlerParams';

function handleHeadClick(e: MouseEvent, {state, actions, dom, config}: IHandlerParams): void {
    if (state.isUseNativeMode) return;

    e.stopPropagation();

    if (state.isClosed) {
        dispatchOpen(actions, config, dom);

        if (!isMobilePlatform(window.navigator.userAgent)) {
            dom.select.focus();
        } else {
            actions.focus();
        }
    } else {
        if (isMobilePlatform(window.navigator.userAgent)) {
            actions.blur();
        }
        actions.close();
    }
}

export default handleHeadClick;