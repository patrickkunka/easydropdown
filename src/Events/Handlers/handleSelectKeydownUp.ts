import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleSelectKeydownUp({keyCode}: KeyboardEvent, {state, config, dom, actions}: IHandlerParams): void {
    if (state.isClosed) {
        actions.open(detectBodyCollision(dom, config));

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