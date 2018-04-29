import setGeometry    from '../../Shared/Util/setGeometry';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleWindowResize(e: Event, {state, actions, dom}: IHandlerParams): void {
    setGeometry(state, actions, dom);
}

export default handleWindowResize;