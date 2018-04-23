import IHandlerParams from '../Interfaces/IHandlerParams';

function handleHeadClick(e: MouseEvent, {state, actions, dom}: IHandlerParams): void {
    e.stopPropagation();

    if (state.isClosed) {
        actions.openAbove();

        dom.select.focus();
    }
}

export default handleHeadClick;