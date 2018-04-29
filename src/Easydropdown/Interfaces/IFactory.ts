import IConfig            from '../../Config/Interfaces/IConfig';
import EasydropdownFacade from '../EasydropdownFacade';

interface IFactory {
    (
        selectElementOrSelector: (HTMLSelectElement|string),
        options?: IConfig
    ): EasydropdownFacade;
    all(): void;
    destroy(): void;
}

export default IFactory;