import IHandlerParams from '../Interfaces/IHandlerParams';

function handleWindowResize(e: Event, {actions}: IHandlerParams): void {
    actions.close();
}

export default handleWindowResize;