import IHandlerParams from '../Interfaces/IHandlerParams';

function handleSelectBlur(e: Event, {actions, state}: IHandlerParams): void {
    if (state.isKeying) return;

    actions.blur();
}

export default handleSelectBlur;