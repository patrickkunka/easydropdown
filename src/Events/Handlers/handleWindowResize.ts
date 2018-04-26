import IHandlerParams from '../Interfaces/IHandlerParams';

function handleWindowResize(e: Event, {state, actions, dom}: IHandlerParams): void {
    actions.setOptionHeight(dom.optionHeight);
}

export default handleWindowResize;