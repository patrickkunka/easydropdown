import detectBodyCollision from '../../Shared/Util/detectBodyCollision';
import detectIsScrollable  from '../../Shared/Util/detectIsScrollable';
import IHandlerParams      from '../Interfaces/IHandlerParams';

function handleSelectKeydownUp(
    {keyCode, metaKey}: KeyboardEvent,
    {state, config, dom, actions}: IHandlerParams
): void {
    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    let iterations = 0;
    let incrementAmount: number = 1;

    if (metaKey) {
        incrementAmount = Math.round(
            Math.max(state.totalOptions / 2, config.behavior.maxVisibleOptions)
        );
    }

    do {
        focusedIndex -= incrementAmount;

        incrementAmount = 1;

        if (focusedIndex < 0) {
            focusedIndex = config.behavior.loop ? state.totalOptions - 1 : 0;
        }

        actions.focusOption(focusedIndex, true);

        iterations++;
    }
    while (
        state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations < state.totalOptions
    );

    if (state.isClosed) {
        actions.open(
            detectBodyCollision(state, dom, config),
            () => detectIsScrollable(dom),
            dom.optionHeight
        );
    }
}

export default handleSelectKeydownUp;