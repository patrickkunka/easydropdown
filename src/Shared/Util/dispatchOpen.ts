import Config   from '../../Config/Config';
import Dom      from '../../Renderer/Dom';
import IActions from '../../State/Interfaces/IActions';

import detectBodyCollision from './detectBodyCollision';

function dispatchOpen(actions: IActions, config: Config, dom: Dom): void {
    const collisionData = detectBodyCollision(dom, config);

    const maxVisibleItems = collisionData.maxVisibleItemsOverride > -1 ?
        collisionData.maxVisibleItemsOverride : config.behavior.maxVisibleItems;

    const isScrollable = dom.item.length > maxVisibleItems;
    const maxBodyHeight =  dom.sumItemsHeight(maxVisibleItems);

    actions.open(maxBodyHeight, collisionData.type, isScrollable);
}

export default dispatchOpen;