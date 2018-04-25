import IHandlerParams      from '../Interfaces/IHandlerParams';

function handleSelectInvalid(e: Event, {actions, config, dom}: IHandlerParams): void {
    actions.invalidate();
}

export default handleSelectInvalid;