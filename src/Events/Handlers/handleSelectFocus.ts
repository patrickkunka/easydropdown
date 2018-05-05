import dispatchOpen   from '../../Shared/Util/dispatchOpen';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleSelectFocus(e: Event, {actions, config, dom, state}: IHandlerParams): void {
    actions.focus();

    if (config.behavior.openOnFocus && !state.isUseNativeMode) {
        dispatchOpen(actions, config, dom);
    }
}

export default handleSelectFocus;