import IHandlerParams from '../Interfaces/IHandlerParams';

function handleWindowClick(_, {state, actions, dom}: IHandlerParams): void {
    if (!state.isOpen) return;

    actions.close();

    dom.select.blur();
}

export default handleWindowClick;