import detectBodyCollision from '../../Shared/Util/detectBodyCollision';
import detectIsScrollable  from '../../Shared/Util/detectIsScrollable';
import IHandlerParams      from '../Interfaces/IHandlerParams';

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