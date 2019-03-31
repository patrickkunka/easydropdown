import closestParent  from '../../Shared/Util/closestParent';
import * as Selectors from '../Constants/Selectors';
import IHandlerParams from '../Interfaces/IHandlerParams';

function handleBodyMousedown(e: Event, {actions}: IHandlerParams): void {
    e.stopPropagation();

    const option = closestParent(e.target as HTMLElement, Selectors.OPTION, true);

    if (!option) return;

    actions.startClickSelecting();
}

export default handleBodyMousedown;