import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleSelectFocus(e: Event, {actions, config, dom, state}: IHandlerParams): void {
    actions.focus();

    if (config.behavior.openOnFocus && !state.isUseNativeMode) {
        actions.open(detectBodyCollision(dom, config));
    }
}

export default handleSelectFocus;