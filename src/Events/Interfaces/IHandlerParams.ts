import Config   from '../../Config/Config';
import Timers   from '../../Easydropdown/Timers';
import Dom      from '../../Renderer/Dom';
import IActions from '../../State/Interfaces/IActions';
import State    from '../../State/State';

interface IHandlerParams {
    actions: IActions;
    config: Config;
    dom: Dom;
    state: State;
    timers: Timers;
}

export default IHandlerParams;