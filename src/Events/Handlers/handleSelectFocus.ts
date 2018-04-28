import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';
import detectIsScrollable from '../Util/detectIsScrollable';

function handleSelectFocus(e: Event, {actions, config, dom, state}: IHandlerParams): void {
    actions.focus();

    if (config.behavior.openOnFocus && !state.isUseNativeMode) {
        actions.open(
            detectBodyCollision(state, dom, config),
            () => detectIsScrollable(dom),
            dom.optionHeight
        );
    }
}

export default handleSelectFocus;