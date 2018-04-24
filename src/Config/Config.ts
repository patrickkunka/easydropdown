import Behavior   from './Behavior';
import Callbacks  from './Callbacks';
import ClassNames from './ClassNames';
import IConfig    from './Interfaces/IConfig';

class Config implements IConfig {
    public callbacks = new Callbacks();
    public classNames = new ClassNames();
    public behavior = new Behavior();

    constructor() {
        Object.seal(this);
    }
}

export default Config;