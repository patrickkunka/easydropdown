import Timers from '../../Easydropdown/Timers';
import Dom    from '../../Renderer/Dom';
import State  from '../../State/State';

function scrollToView(dom: Dom, timers: Timers, state: State): void {
    const index = Math.max(0, state.focusedIndex > -1 ? state.focusedIndex : state.selectedIndex);
    const option = dom.option[index];

    const {offsetTop, offsetHeight} = option;
    const min = dom.itemsList.scrollTop;
    const max = min + state.maxBodyHeight;

    let remainder: number;

    if (offsetTop < min) {
        dom.itemsList.scrollTop = offsetTop;
    } else if ((remainder = (offsetTop + offsetHeight) - max) > 0) {
        const scrollTop = dom.itemsList.scrollTop + remainder;

        dom.itemsList.scrollTop = scrollTop;
    } else {
        return;
    }

    state.isScrollingToView = true;

    clearTimeout(timers.scrollTimeoutId);

    timers.scrollTimeoutId = window.setTimeout(() => state.isScrollingToView = false, 100);
}

export default scrollToView;