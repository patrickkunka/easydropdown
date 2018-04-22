import merge from 'helpful-merge';

import Config  from '../Config/Config';
import IConfig from '../Config/Interfaces/IConfig';
import State   from '../State/State';
import Dom     from '../Renderer/Dom';
import StateMapper from '../State/StateMapper';
import Renderer from '../Renderer/Renderer';

class Mediator {
    public config: Config;
    public state: State;
    public dom: Dom;

    constructor(selectElement: HTMLSelectElement, options: IConfig) {
        this.config = merge(new Config(), options);
        this.state = StateMapper.mapFromSelect(selectElement);
        this.dom = Renderer.render(this.state, this.config.classNames);
    }
}

export default Mediator;