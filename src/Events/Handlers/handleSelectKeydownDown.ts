import detectBodyCollision from '../../Shared/Util/detectBodyCollision';
import detectIsScrollable  from '../../Shared/Util/detectIsScrollable';
import IHandlerParams      from '../Interfaces/IHandlerParams';

function handleSelectKeydownDown(
    {keyCode, metaKey}: KeyboardEvent,
    {state, dom, actions, config}: IHandlerParams
): void {
    let focusedIndex: number = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    let iterations: number = 0;
    let incrementAmount: number = 1;

    if (metaKey) {
        incrementAmount = Math.round(
            Math.max(state.totalOptions / 2, config.behavior.maxVisibleOptions)
        );
    }

    do {
        focusedIndex += incrementAmount;

        incrementAmount = 1;

        if (focusedIndex >= state.totalOptions) {
            focusedIndex = config.behavior.loop ? 0 : state.totalOptions - 1;
        }

        actions.focusOption(focusedIndex, true);

        iterations++;
    }
    while (
        state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations <= state.totalOptions
    );

    if (state.isClosed) {
        actions.open(
            detectBodyCollision(state, dom, config),
            () => detectIsScrollable(dom),
            dom.optionHeight
        );

        return;
    }
}

export default handleSelectKeydownDown;