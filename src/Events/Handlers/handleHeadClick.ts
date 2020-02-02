import dispatchOpen from '../../Shared/Util/dispatchOpen';
import getIsMobilePlatform from '../../Shared/Util/getIsMobilePlatform';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleHeadClick(
    injectedGetIsMobilePlatform: (ua: string) => boolean,
    e: MouseEvent,
    {state, actions, dom, config}: IHandlerParams
): void {
    if (state.isUseNativeMode) return;

    const isMobilePlatform = injectedGetIsMobilePlatform(window.navigator.userAgent);

    e.stopPropagation();

    if (state.isClosed) {
        dispatchOpen(actions, config, dom);

        if (isMobilePlatform) {
            actions.focus();
        } else {
            dom.select.focus();
        }
    } else {
        actions.close();
    }
}

const boundHandleHeadClick = handleHeadClick.bind(null, getIsMobilePlatform);

export {
    boundHandleHeadClick as default,
    handleHeadClick
};