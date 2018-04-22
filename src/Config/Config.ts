import Callbacks  from './Callbacks';
import ClassNames from './ClassNames';
import IConfig    from './Interfaces/IConfig';

class Config implements IConfig {
    callbacks = new Callbacks();
    classNames = new ClassNames();

    constructor() {
        Object.seal(this);
    }
}

export default Config;