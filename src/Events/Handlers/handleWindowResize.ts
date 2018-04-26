import IHandlerParams from '../Interfaces/IHandlerParams';
import setGeometry from '../Util/setGeometry';

function handleWindowResize(e: Event, {state, actions, dom}: IHandlerParams): void {
    setGeometry(state, actions, dom);
}

export default handleWindowResize;