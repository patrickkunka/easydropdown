import Config          from '../../Config/Config';
import Timers          from '../../Easydropdown/Timers';
import Dom             from '../../Renderer/Dom';
import resolveActions  from '../../State/resolveActions';
import State           from '../../State/State';
import IHandlerParams  from '../Interfaces/IHandlerParams';

const createMockHandlerParams = (): IHandlerParams => {
    const state = new State();
    const actions = resolveActions(state);
    const dom = new Dom();
    const timers = new Timers();
    const config = new Config();

    dom.head = document.createElement('div');
    dom.body = document.createElement('div');
    dom.itemsList = document.createElement('div');
    dom.select = document.createElement('select');

    actions.closeOthers = () => void 0;
    actions.scrollToView = () => void 0;

    return {
        actions,
        config,
        state,
        timers,
        dom
    };
};

export default createMockHandlerParams;