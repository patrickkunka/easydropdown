import Config from '../../Config/Config';
import Dom    from '../../Renderer/Dom';

import CollisionType  from './Constants/CollisionType';
import ICollisionData from './Interfaces/ICollisionData';

const CLEARSPACE = 10;

function mapCollisionData(deltaTop, deltaBottom, maxHeight, itemHeight): ICollisionData {
    let type = CollisionType.NONE;
    let maxVisibleItemsOverride = -1;

    if (deltaTop <= maxHeight && deltaBottom <= maxHeight) {
        const largestDelta = Math.max(deltaBottom, deltaTop);

        type = deltaTop < deltaBottom ? CollisionType.TOP : CollisionType.BOTTOM;
        maxVisibleItemsOverride = Math.floor(largestDelta / itemHeight);
    } else if (deltaTop <= maxHeight) {
        type = CollisionType.TOP;
    } else if (deltaBottom <= maxHeight) {
        type = CollisionType.BOTTOM;
    }

    return {type, maxVisibleItemsOverride};
}

function detectBodyCollision(dom: Dom, config: Config): ICollisionData {
    const bbHead = dom.head.getBoundingClientRect();
    const wh = window.innerHeight;
    const deltaTop = bbHead.top - CLEARSPACE;
    const deltaBottom = wh - bbHead.bottom - CLEARSPACE;

    if (dom.option.length < 1) return {
        type: CollisionType.NONE,
        maxVisibleItemsOverride: -1
    };

    const maxVisibleItems = Math.min(config.behavior.maxVisibleItems, dom.item.length);
    const maxHeight = dom.sumItemsHeight(maxVisibleItems);
    const itemHeight = dom.sumItemsHeight(1);

    return mapCollisionData(deltaTop, deltaBottom, maxHeight, itemHeight);
}

export {
    detectBodyCollision as default,
    mapCollisionData
};