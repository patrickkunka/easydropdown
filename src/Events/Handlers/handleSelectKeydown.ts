import detectBodyCollision     from '../../Shared/Util/detectBodyCollision';
import detectIsScrollable      from '../../Shared/Util/detectIsScrollable';
import killSelectReaction      from '../../Shared/Util/killSelectReaction';
import * as KeyCodes           from '../Constants/Keycodes';
import IHandlerParams          from '../Interfaces/IHandlerParams';
import handleSelectKeydownDown from './handleSelectKeydownDown';
import handleSelectKeydownUp   from './handleSelectKeydownUp';

function handleSelectKeydown(e: KeyboardEvent, handlerParams: IHandlerParams): void {
    const {keyCode, target} = e;
    const {state, actions, dom, config} = handlerParams;

    if (state.isUseNativeMode || state.isDisabled) return;

    switch (keyCode) {
        case KeyCodes.DOWN:
            handleSelectKeydownDown(e, handlerParams);

            killSelectReaction(target as HTMLSelectElement);

            break;
        case KeyCodes.UP:
            handleSelectKeydownUp(e, handlerParams);

            killSelectReaction(target as HTMLSelectElement);

            break;
        case KeyCodes.SPACE:
            if (state.isSearching) return;
        case KeyCodes.ENTER:
            e.stopPropagation();
            e.preventDefault();

            killSelectReaction(target as HTMLSelectElement);

            if (state.isOpen) {
                actions.selectOption(state.focusedIndex);
            } else {
                actions.open(
                    detectBodyCollision(state, dom, config),
                    () => detectIsScrollable(dom),
                    dom.optionHeight
                );
            }

            break;
        case KeyCodes.ESC:
            actions.close();

            break;
    }
}

export default handleSelectKeydown;