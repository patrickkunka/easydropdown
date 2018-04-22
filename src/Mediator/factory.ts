import IConfig  from '../Config/Interfaces/IConfig';
import Mediator from './Mediator';

const easydropdown = (selectElement: HTMLSelectElement, options: IConfig = {}) => {
    const mediator = new Mediator(selectElement, options);

    return mediator;
};

export default easydropdown;