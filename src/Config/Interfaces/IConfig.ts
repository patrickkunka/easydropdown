import IBehavior   from './IBehavior';
import ICallbacks  from './ICallbacks';
import IClassNames from './IClassNames';

interface IConfig {
    behavior?: IBehavior;
    callbacks?: ICallbacks;
    classNames?: IClassNames;
}

export default IConfig;