import IHandlerParams from '../Interfaces/IHandlerParams';

const SEARCH_RESET_DURATION = 1200;

function handleSelectKeypress(e: KeyboardEvent, handlerParams: IHandlerParams): void {
    const {actions, timers} = handlerParams;

    clearTimeout(timers.searchTimoutId);

    actions.search();

    timers.searchTimoutId = window.setTimeout(() => actions.resetSearch(), SEARCH_RESET_DURATION);

}

export default handleSelectKeypress;