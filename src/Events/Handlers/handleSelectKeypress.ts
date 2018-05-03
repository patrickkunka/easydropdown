import * as KeyCodes  from '../Constants/KeyCodes';
import IHandlerParams from '../Interfaces/IHandlerParams';

const SEARCH_RESET_DURATION = 1200;

function handleSelectKeypress(
    {keyCode}: KeyboardEvent,
    {actions, timers, state}: IHandlerParams,
    searchResetDuration = SEARCH_RESET_DURATION
): void {
    if (state.isUseNativeMode || [KeyCodes.UP, KeyCodes.DOWN].includes(keyCode)) return;

    window.clearTimeout(timers.searchTimeoutId);

    actions.search();

    timers.searchTimeoutId = window.setTimeout(() => actions.resetSearch(), searchResetDuration);
}

export default handleSelectKeypress;