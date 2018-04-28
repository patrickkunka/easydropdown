import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';
import detectIsScrollable  from '../Util/detectIsScrollable';

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