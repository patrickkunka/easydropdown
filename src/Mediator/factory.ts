import IConfig  from '../Config/Interfaces/IConfig';
import cache    from './cache';
import Mediator from './Mediator';

function easydropdown(selectElementOrSelector: (HTMLSelectElement|string), options: IConfig = {}): Mediator {
    let selectElement = selectElementOrSelector;

    if (typeof selectElementOrSelector === 'string') {
        selectElement = document.querySelector(selectElementOrSelector) as HTMLSelectElement;
    }

    if (!(selectElement instanceof HTMLSelectElement)) {
        throw new TypeError('[EasyDropDown] Invalid select element provided');
    }

    for (const instance of cache) {
        if (instance.selectElement === selectElement) {
            return instance;
        }
    }

    const mediator = new Mediator(selectElement, options);

    cache.push(mediator);

    return mediator;
}

export default easydropdown;