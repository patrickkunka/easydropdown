import dispatchOpen       from '../../Shared/Util/dispatchOpen';
import killSelectReaction from '../../Shared/Util/killSelectReaction';
import * as KeyCodes      from '../Constants/KeyCodes';
import IHandlerParams     from '../Interfaces/IHandlerParams';

import handleSelectKeydownDown from './handleSelectKeydownDown';
import handleSelectKeydownUp   from './handleSelectKeydownUp';

function handleSelectKeydown(e: KeyboardEvent, handlerParams: IHandlerParams): void {
    const {keyCode, target} = e;
    const {state, actions, dom, config} = handlerParams;

    if (state.isUseNativeMode || state.isDisabled) return;

    switch (keyCode) {
        case KeyCodes.DOWN:
            handleSelectKeydownDown(e, handlerParams);

            break;
        case KeyCodes.UP:
            handleSelectKeydownUp(e, handlerParams);

            break;
        case KeyCodes.SPACE:
            if (state.isSearching) {
                e.stopPropagation();

                return;
            }

        case KeyCodes.ENTER:
            e.stopPropagation();
            e.preventDefault();

            killSelectReaction(target as HTMLSelectElement, handlerParams);

            if (state.isOpen) {
                actions.selectOption(state.focusedIndex, config.behavior.closeOnSelect);
            } else {
                dispatchOpen(actions, config, dom);
            }

            break;
        case KeyCodes.ESC:
            actions.close();

            break;
    }
}

export default handleSelectKeydown;