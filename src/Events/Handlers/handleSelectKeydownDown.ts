import IHandlerParams from '../Interfaces/IHandlerParams';

function handleSelectKeydownDown({keyCode}: KeyboardEvent, {state, actions}: IHandlerParams): void {
    if (state.isClosed) {
        actions.openAbove();

        return;
    }

    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    do {
        actions.focusOption(focusedIndex += 1);
    }
    while (state.focusedOption && state.focusedOption.isDisabled);

    if (focusedIndex >= state.totalOptions) {
        focusedIndex = 0;
    }

    actions.focusOption(focusedIndex);
}

export default handleSelectKeydownDown;