import merge from 'helpful-merge';

import Config              from '../Config/Config';
import ICallback           from '../Config/Interfaces/ICallback';
import IConfig             from '../Config/Interfaces/IConfig';
import bindEvents          from '../Events/bindEvents';
import EventBinding        from '../Events/EventBinding';
import pollForSelectChange from '../Events/pollForSelectChange';
import detectBodyCollision from '../Events/Util/detectBodyCollision';
import detectIsScrollable  from '../Events/Util/detectIsScrollable';
import setGeometry         from '../Events/Util/setGeometry';
import Dom                 from '../Renderer/Dom';
import Renderer            from '../Renderer/Renderer';
import closeOthers         from '../State/InjectedActions/closeOthers';
import scrollToView        from '../State/InjectedActions/scrollToView';
import IActions            from '../State/Interfaces/IActions';
import State               from '../State/State';
import StateManager        from '../State/StateManager';
import StateMapper         from '../State/StateMapper';
import cache               from './cache';
import Timers              from './Timers';

class Easydropdown {
    public actions: IActions;

    private config: Config;
    private state: State;
    private dom: Dom;
    private eventBindings: EventBinding[];
    private renderer: Renderer;
    private timers: Timers;

    constructor(selectElement: HTMLSelectElement, options: IConfig) {
        this.config = merge(new Config(), options, true);
        this.state = StateMapper.mapFromSelect(selectElement, this.config);
        this.renderer = new Renderer(this.config.classNames);
        this.dom = this.renderer.render(this.state, selectElement);
        this.timers = new Timers();

        this.actions = StateManager.proxyActions(this.state, {
            closeOthers: closeOthers.bind(null, this, cache),
            scrollToView: scrollToView.bind(null, this.dom, this.timers)
        }, this.handleStateUpdate.bind(this));

        this.eventBindings = bindEvents({
            actions: this.actions,
            config: this.config,
            dom: this.dom,
            state: this.state,
            timers: this.timers
        });

        this.timers.pollIntervalId = pollForSelectChange(this.dom.select, this.state, this.actions);

        this.init();
    }

    public get selectElement(): HTMLSelectElement {
        return this.dom.select;
    }

    public get value(): string {
        return this.state.value;
    }

    public set value(nextValue: string) {
        if (typeof nextValue !== 'string') {
            throw new TypeError('[EasyDropDown] Provided value not a valid string');
        }

        this.dom.select.value = nextValue;
    }

    public open(): void {
        this.actions.open(
            detectBodyCollision(this.state, this.dom, this.config),
            () => detectIsScrollable(this.dom),
            this.dom.optionHeight
        );
    }

    public close(): void {
        this.actions.close();
    }

    public refresh(): void {
        this.state = Object.assign(
            this.state,
            StateMapper.mapFromSelect(this.dom.select, this.config)
        );

        this.dom.group = Array.from(this.dom.body.querySelectorAll('[data-ref="group"]'));
        this.dom.option = Array.from(this.dom.body.querySelectorAll('[data-ref="option"]'));
    }

    public destroy(): void {
        this.eventBindings.forEach(binding => binding.unbind());

        this.renderer.destroy();

        this.timers.clear();

        const cacheIndex = cache.indexOf(this);

        cache.splice(cacheIndex, 1);
    }

    private init(): void {
        setGeometry(this.state, this.actions, this.dom);
    }

    private handleStateUpdate(state: State, key: keyof State): void {
        const {callbacks} = this.config;

        let cb: ICallback;
        let arg: any;

        this.renderer.update(state, key);

        switch (key) {
            case 'bodyStatus':
                if (state.isOpen) {
                    cb = callbacks.onOpen;
                } else if (state.isClosed) {
                    cb = callbacks.onClose;
                }

                break;
            case 'selectedIndex':
                cb = callbacks.onSelect;
                arg = state.value;

                break;
        }

        if (typeof cb === 'function') cb(arg);
    }
}

export default Easydropdown;