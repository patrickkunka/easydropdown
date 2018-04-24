import IHandlerParams from '../Interfaces/IHandlerParams';

function handleSelectBlur(e: Event, {actions}: IHandlerParams): void {
    actions.blur();
}

export default handleSelectBlur;