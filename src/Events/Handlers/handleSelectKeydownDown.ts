import dispatchOpen       from '../../Shared/Util/dispatchOpen';
import killSelectReaction from '../../Shared/Util/killSelectReaction';
import IHandlerParams     from '../Interfaces/IHandlerParams';

function handleSelectKeydownDown(
    e: KeyboardEvent,
    handlerParams: IHandlerParams
): void {
    const {metaKey, target} = e;
    const {state, dom, actions, config} = handlerParams;

    let focusedIndex: number = state.focusedIndex > -1 ?
    state.focusedIndex : state.selectedIndex;

    let iterations: number = 0;
    let incrementAmount: number = 1;

    e.preventDefault();

    killSelectReaction(target as HTMLSelectElement, handlerParams);

    if (metaKey) {
        incrementAmount = Math.round(
            Math.max(state.totalOptions / 2, config.behavior.maxVisibleItems)
        );
    }

    do {
        focusedIndex += incrementAmount;

        incrementAmount = 1;

        if (focusedIndex >= state.totalOptions) {
            focusedIndex = config.behavior.loop ? 0 : state.totalOptions - 1;
        }

        actions.focusOption(focusedIndex, true);

        iterations++;
    }
    while (
        state.focusedOption &&
        state.focusedOption.isDisabled &&
        iterations <= state.totalOptions
    );

    if (state.isClosed) {
        dispatchOpen(actions, config, dom);

        return;
    }
}

export default handleSelectKeydownDown;