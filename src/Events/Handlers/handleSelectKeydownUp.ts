import IHandlerParams from '../Interfaces/IHandlerParams';

function handleSelectKeydownUp({keyCode}: KeyboardEvent, {state, actions}: IHandlerParams): void {
    if (state.isClosed) {
        actions.openAbove();

        return;
    }

    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    do {
        actions.focusOption(focusedIndex -= 1);
    }
    while (state.focusedOption && state.focusedOption.isDisabled);

    if (focusedIndex === 0) {
        focusedIndex = state.totalOptions - 1;
    }

    actions.focusOption(focusedIndex);
}

export default handleSelectKeydownUp;