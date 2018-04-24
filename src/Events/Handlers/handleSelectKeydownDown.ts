import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleSelectKeydownDown({keyCode}: KeyboardEvent, {state, dom, actions, config}: IHandlerParams): void {
    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    let iterations = 0;

    do {
        focusedIndex += 1;

        if (focusedIndex >= state.totalOptions) {
            focusedIndex = 0;
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
        actions.open(detectBodyCollision(dom, config), dom.optionHeight);

        return;
    }
}

export default handleSelectKeydownDown;