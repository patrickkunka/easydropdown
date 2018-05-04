import Config from '../../Config/Config';
import Dom    from '../../Renderer/Dom';
import State  from '../../State/State';

import CollisionType  from './Constants/CollisionType';
import ICollisionData from './Interfaces/ICollisionData';

function mapCollisionData(deltaTop, deltaBottom, maxHeight, optionHeight): ICollisionData {
    let type = CollisionType.NONE;
    let maxVisibleOptionsOverride = -1;

    if (deltaTop <= maxHeight && deltaBottom <= maxHeight) {
        const largestDelta = Math.max(deltaBottom, deltaTop);

        type = deltaTop < deltaBottom ? CollisionType.TOP : CollisionType.BOTTOM,
        maxVisibleOptionsOverride = Math.floor(largestDelta / optionHeight);
    } else if (deltaTop <= maxHeight) {
        type = CollisionType.TOP;
    } else if (deltaBottom <= maxHeight) {
        type = CollisionType.BOTTOM;
    }

    return {type, maxVisibleOptionsOverride};
}

function detectBodyCollision(state: State, dom: Dom, config: Config): ICollisionData {
    const bbHead = dom.head.getBoundingClientRect();
    const wh = window.innerHeight;
    const deltaTop = bbHead.top;
    const deltaBottom = wh - bbHead.bottom;

    if (!dom.firstOption) return {
        type: CollisionType.NONE,
        maxVisibleOptionsOverride: -1
    };

    const visibleOptions = Math.min(config.behavior.maxVisibleOptions, state.totalOptions);
    const maxHeight = visibleOptions * dom.optionHeight;

    return mapCollisionData(deltaTop, deltaBottom, maxHeight, dom.optionHeight);
}

export {
    detectBodyCollision as default,
    mapCollisionData
};