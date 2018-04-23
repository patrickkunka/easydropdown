import merge from 'helpful-merge';

import Config       from '../Config/Config';
import IConfig      from '../Config/Interfaces/IConfig';
import EventBinding from '../Events/EventBinding';
import EventManager from '../Events/EventManager';
import Dom          from '../Renderer/Dom';
import Renderer     from '../Renderer/Renderer';
import State        from '../State/State';
import StateManager from '../State/StateManager';
import StateMapper  from '../State/StateMapper';

class Mediator {
    public actions: any;
    public config: Config;
    public state: State;
    public dom: Dom;
    public eventBindings: EventBinding[];
    public renderer: Renderer;

    constructor(selectElement: HTMLSelectElement, options: IConfig) {
        this.config        = merge(new Config(), options);
        this.state         = StateMapper.mapFromSelect(selectElement);
        this.renderer      = new Renderer(this.config.classNames);
        this.dom           = this.renderer.render(this.state, selectElement);
        this.actions       = StateManager.proxyActions(this.state, state => this.renderer.update(state));
        this.eventBindings = EventManager.bindEvents(this.state, this.actions, this.dom);

        console.log(this.state, this.dom);
    }

    public destroy(): void {
        this.eventBindings.forEach(binding => binding.unbind());
    }
}

export default Mediator;