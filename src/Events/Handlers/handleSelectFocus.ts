import IHandlerParams      from '../Interfaces/IHandlerParams';
import detectBodyCollision from '../Util/detectBodyCollision';

function handleSelectFocus(e: Event, {actions, config, dom}: IHandlerParams): void {
    actions.focus();

    if (config.behavior.openOnFocus) {
        actions.open(detectBodyCollision(dom, config));
    }
}

export default handleSelectFocus;