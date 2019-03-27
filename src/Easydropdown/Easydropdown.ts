import merge from 'helpful-merge';

import Config                 from '../Config/Config';
import ICallback              from '../Config/Interfaces/ICallback';
import IConfig                from '../Config/Interfaces/IConfig';
import ISelectCallback        from '../Config/Interfaces/ISelectCallback';
import bindEvents             from '../Events/bindEvents';
import EventBinding           from '../Events/EventBinding';
import Dom                    from '../Renderer/Dom';
import Renderer               from '../Renderer/Renderer';
import dispatchOpen           from '../Shared/Util/dispatchOpen';
import pollForSelectChange    from '../Shared/Util/pollForSelectChange';
import pollForSelectMutation  from '../Shared/Util/pollForSelectMutation';
import closeOthers            from '../State/InjectedActions/closeOthers';
import scrollToView           from '../State/InjectedActions/scrollToView';
import IActions               from '../State/Interfaces/IActions';
import State                  from '../State/State';
import StateManager           from '../State/StateManager';
import StateMapper            from '../State/StateMapper';

import cache  from './cache';
import Timers from './Timers';

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

        this.timers.pollChangeIntervalId = pollForSelectChange(this.dom.select, this.state, this.actions, this.config);

        if (this.config.behavior.liveUpdates) {
            this.timers.pollMutationIntervalId = pollForSelectMutation(
                this.dom.select,
                this.state,
                this.refresh.bind(this)
            );
        }
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
        dispatchOpen(this.actions, this.config, this.dom);
    }

    public close(): void {
        this.actions.close();
    }

    public refresh(): void {
        this.state = merge(
            this.state,
            StateMapper.mapFromSelect(this.dom.select, this.config)
        );

        this.renderer.update(this.state);

        this.dom.group.length = this.dom.option.length = this.dom.item.length = 0;

        Renderer.queryDomRefs(this.dom, ['group', 'option', 'item']);
    }

    public destroy(): void {
        this.timers.clear();
        this.eventBindings.forEach(binding => binding.unbind());
        this.renderer.destroy();

        const cacheIndex = cache.indexOf(this);

        cache.splice(cacheIndex, 1);
    }

    private handleStateUpdate(state: State, key: keyof State): void {
        const {callbacks} = this.config;

        let cb: ICallback;

        this.renderer.update(state, key);

        switch (key) {
            case 'bodyStatus':
                if (state.isOpen) {
                    cb = callbacks.onOpen;
                } else {
                    cb = callbacks.onClose;
                }

                if (typeof cb === 'function') cb();

                break;
            case 'selectedIndex':
                cb = callbacks.onSelect;

                if (typeof cb === 'function') (cb as ISelectCallback)(state.value);
        }
    }
}

export default Easydropdown;