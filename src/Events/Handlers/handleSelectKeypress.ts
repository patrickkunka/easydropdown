import IHandlerParams from '../Interfaces/IHandlerParams';

const SEARCH_RESET_DURATION = 1200;

function handleSelectKeypress(
    e: KeyboardEvent,
    {actions, timers, state}: IHandlerParams,
    searchResetDuration = SEARCH_RESET_DURATION
): void {
    if (state.isUseNativeMode) return;

    window.clearTimeout(timers.searchTimoutId);

    actions.search();

    timers.searchTimoutId = window.setTimeout(() => actions.resetSearch(), searchResetDuration);
}

export default handleSelectKeypress;