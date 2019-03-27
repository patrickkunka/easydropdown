import closestParent  from '../../Shared/Util/closestParent';
import * as Selectors from '../Constants/Selectors';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleBodyClick(e: Event, {state, actions, dom, config}: IHandlerParams): void {
    e.stopPropagation();

    const option = closestParent(e.target as HTMLElement, Selectors.OPTION, true);

    if (!option) return;

    const optionIndex = Array.prototype.indexOf.call(dom.option, option);

    actions.selectOption(optionIndex, config.behavior.closeOnSelect);
}

export default handleBodyClick;