import IHandlerParams from '../Interfaces/IHandlerParams';

function handleSelectBlur(e: Event, {actions, state, config}: IHandlerParams): void {
    if (state.isKeying) return;

    actions.blur();

    if (config.behavior.openOnFocus && !state.isClickSelecting) actions.close();
}

export default handleSelectBlur;