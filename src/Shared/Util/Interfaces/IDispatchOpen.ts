import Config   from '../../../Config/Config';
import Dom      from '../../../Renderer/Dom';
import IActions from '../../../State/Interfaces/IActions';

type IDispatchOpen = (
    actions: IActions,
    config: Config,
    dom: Dom
) => void;

export default IDispatchOpen;