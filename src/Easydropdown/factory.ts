import IConfig            from '../Config/Interfaces/IConfig';
import cache              from './cache';
import Easydropdown       from './Easydropdown';
import EasydropdownFacade from './EasydropdownFacade';
import IFactory           from './Interfaces/IFactory';

function factory(
    selectElementOrSelector: (HTMLSelectElement|string),
    options: IConfig = {}
): EasydropdownFacade {
    let selectElement = selectElementOrSelector;

    if (typeof selectElementOrSelector === 'string') {
        selectElement = document.querySelector(selectElementOrSelector) as HTMLSelectElement;
    }

    if (!(selectElement instanceof HTMLSelectElement)) {
        throw new TypeError('[EasyDropDown] Invalid select element provided');
    }

    for (const cachedInstance of cache) {
        if (cachedInstance.selectElement === selectElement) {
            return cachedInstance;
        }
    }

    const instance = new Easydropdown(selectElement, options);

    cache.push(instance);

    return new EasydropdownFacade(instance);
}

function decorateFactory(factoryFn: any): IFactory {
    factoryFn.all = (options: IConfig = {}) => {
        const selects = document.querySelectorAll('select');

        Array.prototype.forEach.call(selects, select => factory(select, options));
    };

    factoryFn.destroy = () => {
        const cacheCopy = cache.slice();

        cacheCopy.forEach(instance => instance.destroy());
    };

    return factoryFn;
}

const decoratedFactory = decorateFactory(factory);

export default decoratedFactory;