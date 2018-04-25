import Dom    from '../../Renderer/Dom';
import State  from '../../State/State';
import Timers from '../Timers';

function scrollToView(dom: Dom, timers: Timers, state: State): void {
    const index = Math.max(0, state.focusedIndex > -1 ? state.focusedIndex : state.selectedIndex);
    const option = dom.option[index];

    const {offsetTop, offsetHeight} = option;
    const min = dom.body.scrollTop;
    const max = min + state.maxBodyHeight;

    let remainder: number;

    if (offsetTop < min) {
        dom.body.scrollTop = offsetTop;
    } else if ((remainder = (offsetTop + offsetHeight) - max) > 0) {
        dom.body.scrollTop = dom.body.scrollTop + remainder;
    } else {
        return;
    }

    state.isScrollingToView = true;

    clearTimeout(timers.scrollTimeoutId);

    timers.scrollTimeoutId = window.setTimeout(() => state.isScrollingToView = false, 100);
}

export default scrollToView;