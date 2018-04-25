import Mediator from '../Mediator';

function closeOthers(thisInstance: Mediator, cache: Mediator[]): void {
    for (const instance of cache) {
        if (instance !== thisInstance) instance.actions.close();
    }
}

export default closeOthers;