import Easydropdown from '../../Easydropdown/Easydropdown';

function closeOthers(thisInstance: Easydropdown, cache: Easydropdown[]): void {
    for (const instance of cache) {
        if (instance !== thisInstance) instance.actions.close();
    }
}

export default closeOthers;