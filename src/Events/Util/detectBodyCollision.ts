import Config        from '../../Config/Config';
import Dom           from '../../Renderer/Dom';
import CollisionType from '../../State/Constants/CollisionType';

function detectBodyCollision(dom: Dom, config: Config): CollisionType {
    const bbHead = dom.head.getBoundingClientRect();
    const wh = window.innerHeight;
    const deltaTop = bbHead.top;
    const deltaBottom = wh - bbHead.bottom;

    if (!dom.firstOption) return CollisionType.NONE;

    const maxHeight = config.behavior.maxVisibleOptions * dom.optionHeight;

    if (deltaTop <= maxHeight) {
        return CollisionType.TOP;
    } else if (deltaBottom <= maxHeight) {
        return CollisionType.BOTTOM;
    }

    return CollisionType.NONE;
}

export default detectBodyCollision;