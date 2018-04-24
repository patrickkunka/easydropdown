import * as KeyCodes           from '../Constants/Keycodes';
import IHandlerParams          from '../Interfaces/IHandlerParams';
import handleSelectKeydownDown from './handleSelectKeydownDown';
import handleSelectKeydownUp   from './handleSelectKeydownUp';

function handleSelectKeydown(e: KeyboardEvent, handlerParams: IHandlerParams): void {
    const {keyCode} = e;
    const {state, actions} = handlerParams;

    switch (keyCode) {
        case KeyCodes.DOWN:
            handleSelectKeydownDown(e, handlerParams);

            break;
        case KeyCodes.UP:
            handleSelectKeydownUp(e, handlerParams);

            break;
        case KeyCodes.SPACE:
        case KeyCodes.ENTER:
            actions.selectOption(state.focusedIndex);

            break;
        case KeyCodes.ESC:
            actions.close();

            break;
    }
}

export default handleSelectKeydown;