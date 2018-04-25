import merge from 'helpful-merge';

import Config              from '../Config/Config';
import IConfig             from '../Config/Interfaces/IConfig';
import EventBinding        from '../Events/EventBinding';
import EventManager        from '../Events/EventManager';
import pollForSelectChange from '../Events/pollForSelectChange';
import Dom                 from '../Renderer/Dom';
import Renderer            from '../Renderer/Renderer';
import State               from '../State/State';
import StateManager        from '../State/StateManager';
import StateMapper         from '../State/StateMapper';

class Mediator {
    private actions: any;
    private config: Config;
    private state: State;
    private dom: Dom;
    private eventBindings: EventBinding[];
    private renderer: Renderer;
    private pollId;

    constructor(selectElement: HTMLSelectElement, options: IConfig) {
        this.config   = merge(new Config(), options);
        this.state    = StateMapper.mapFromSelect(selectElement, this.config);
        this.renderer = new Renderer(this.config.classNames);
        this.dom      = this.renderer.render(this.state, selectElement);
        this.actions  = StateManager.proxyActions(this.state, this.renderer.update.bind(this.renderer));
        this.pollId   = pollForSelectChange(this.dom.select, this.state, this.actions);

        this.eventBindings = EventManager.bindEvents({
            actions: this.actions,
            config: this.config,
            dom: this.dom,
            state: this.state
        });
    }

    public destroy(): void {
        this.eventBindings.forEach(binding => binding.unbind());

        window.clearInterval(this.pollId);
    }
}

export default Mediator;