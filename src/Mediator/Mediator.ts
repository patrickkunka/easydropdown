import merge from 'helpful-merge';

import Config              from '../Config/Config';
import IConfig             from '../Config/Interfaces/IConfig';
import EventBinding        from '../Events/EventBinding';
import EventManager        from '../Events/EventManager';
import pollForSelectChange from '../Events/pollForSelectChange';
import detectBodyCollision from '../Events/Util/detectBodyCollision';
import Dom                 from '../Renderer/Dom';
import Renderer            from '../Renderer/Renderer';
import IActions            from '../State/Interfaces/IActions';
import State               from '../State/State';
import StateManager        from '../State/StateManager';
import StateMapper         from '../State/StateMapper';
import cache               from './cache';
import closeOthers         from './Util/closeOthers';

class Mediator {
    public actions: IActions;

    private config: Config;
    private state: State;
    private dom: Dom;
    private eventBindings: EventBinding[];
    private renderer: Renderer;
    private pollId: number;

    constructor(selectElement: HTMLSelectElement, options: IConfig) {
        this.config   = merge(new Config(), options);
        this.state    = StateMapper.mapFromSelect(selectElement, this.config);
        this.renderer = new Renderer(this.config.classNames);
        this.dom      = this.renderer.render(this.state, selectElement);

        this.actions = StateManager.proxyActions(this.state, {
            closeOthers: closeOthers.bind(null, this, cache)
        }, this.renderer.update.bind(this.renderer));

        this.eventBindings = EventManager.bindEvents({
            actions: this.actions,
            config: this.config,
            dom: this.dom,
            state: this.state
        });

        this.pollId = pollForSelectChange(this.dom.select, this.state, this.actions);
    }

    public get selectElement(): HTMLSelectElement {
        return this.dom.select;
    }

    public open(): void {
        this.actions.open(detectBodyCollision(this.dom, this.config), this.dom.optionHeight);
    }

    public close(): void {
        this.actions.close();
    }

    public destroy(): void {
        this.eventBindings.forEach(binding => binding.unbind());

        this.renderer.destroy();

        window.clearInterval(this.pollId);
    }
}

export default Mediator;