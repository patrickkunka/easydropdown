import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

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

        actions.focusOption(focusedIndex);

        iterations++;
    }
    while (
        state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations <= state.totalOptions
    );

    if (state.isClosed) {
        actions.open(detectBodyCollision(dom, config));

        return;
    }
}

export default handleSelectKeydownDown;