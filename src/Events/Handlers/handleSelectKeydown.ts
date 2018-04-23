import * as KeyCodes  from '../Constants/Keycodes';
import IHandlerParams from '../Interfaces/IHandlerParams';

const handleSelectKeydown = ({keyCode}: KeyboardEvent, {state, actions}: IHandlerParams) => {
    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    switch (keyCode) {
        case KeyCodes.DOWN:
            do {
                actions.focusOption(focusedIndex += 1);
            }
            while (state.focusedOption && state.focusedOption.isDisabled);

            if (focusedIndex >= state.totalOptions) {
                focusedIndex = 0;
            }

            actions.focusOption(focusedIndex);

            break;
        case KeyCodes.UP:
            do {
                actions.focusOption(focusedIndex -= 1);
            }
            while (state.focusedOption && state.focusedOption.isDisabled);

            if (focusedIndex === 0) {
                focusedIndex = state.totalOptions - 1;
            }

            actions.focusOption(focusedIndex);

            break;
    }
};

export default handleSelectKeydown;