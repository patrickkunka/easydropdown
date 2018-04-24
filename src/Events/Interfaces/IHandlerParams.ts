import Config   from '../../Config/Config';
import Dom      from '../../Renderer/Dom';
import IActions from '../../State/Interfaces/IActions';
import State    from '../../State/State';

interface IHandlerParams {
    actions: IActions;
    config: Config;
    dom: Dom;
    state: State;
}

export default IHandlerParams;