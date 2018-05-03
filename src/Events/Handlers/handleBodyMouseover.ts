import closestParent  from '../../Shared/Util/closestParent';
import * as Selectors from '../Constants/Selectors';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleBodyMouseover(e: Event, {state, actions, dom}: IHandlerParams): void {
    e.stopPropagation();

    const option = closestParent(e.target as HTMLElement, Selectors.OPTION, true);

    if (!option || state.isKeying) return;

    const optionIndex = Array.prototype.indexOf.call(dom.option, option);

    actions.focusOption(optionIndex);
}

export default handleBodyMouseover;