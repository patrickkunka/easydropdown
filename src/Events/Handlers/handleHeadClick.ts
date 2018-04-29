import detectBodyCollision from '../../Shared/Util/detectBodyCollision';
import detectIsScrollable  from '../../Shared/Util/detectIsScrollable';
import IHandlerParams      from '../Interfaces/IHandlerParams';

function handleHeadClick(e: MouseEvent, {state, actions, dom, config}: IHandlerParams): void {
    if (state.isUseNativeMode) return;

    e.stopPropagation();

    if (state.isClosed) {
        actions.open(
            detectBodyCollision(state, dom, config),
            () => detectIsScrollable(dom),
            dom.optionHeight
        );

        dom.select.focus();
    } else {
        actions.close();
    }
}

export default handleHeadClick;