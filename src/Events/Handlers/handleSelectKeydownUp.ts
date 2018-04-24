import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleSelectKeydownUp({keyCode}: KeyboardEvent, {state, config, dom, actions}: IHandlerParams): void {
    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    let iterations = 0;

    do {
        focusedIndex -= 1;

        if (focusedIndex < 0) {
            focusedIndex = state.totalOptions - 1;
        }

        actions.focusOption(focusedIndex);

        iterations++;
    }
    while (
        state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations < state.totalOptions
    );

    if (state.isClosed) {
        actions.open(detectBodyCollision(dom, config), dom.optionHeight);
    }
}

export default handleSelectKeydownUp;