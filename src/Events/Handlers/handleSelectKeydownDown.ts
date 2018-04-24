import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleSelectKeydownDown({keyCode}: KeyboardEvent, {state, dom, actions, config}: IHandlerParams): void {
    if (state.isClosed) {
        actions.open(detectBodyCollision(dom, config));

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