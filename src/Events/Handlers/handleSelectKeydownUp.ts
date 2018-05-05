import dispatchOpen       from '../../Shared/Util/dispatchOpen';
import killSelectReaction from '../../Shared/Util/killSelectReaction';
import IHandlerParams     from '../Interfaces/IHandlerParams';

function handleSelectKeydownUp(
    e: KeyboardEvent,
    handlerParams: IHandlerParams
): void {
    const {metaKey, target} = e;
    const {state, config, dom, actions} = handlerParams;

    let focusedIndex = state.focusedIndex > -1 ?
        state.focusedIndex : state.selectedIndex;

    let iterations = 0;
    let incrementAmount: number = 1;

    e.preventDefault();

    killSelectReaction(target as HTMLSelectElement, handlerParams);

    if (metaKey) {
        incrementAmount = Math.round(
            Math.max(state.totalOptions / 2, config.behavior.maxVisibleItems)
        );
    }

    do {
        focusedIndex -= incrementAmount;

        incrementAmount = 1;

        if (focusedIndex < 0) {
            focusedIndex = config.behavior.loop ? state.totalOptions - 1 : 0;
        }

        actions.focusOption(focusedIndex, true);

        iterations++;
    }
    while (
        state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations < state.totalOptions
    );

    if (state.isClosed) {
        dispatchOpen(actions, config, dom);
    }
}

export default handleSelectKeydownUp;