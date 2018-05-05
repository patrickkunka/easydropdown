import Timers from '../../Easydropdown/Timers';
import Dom    from '../../Renderer/Dom';
import State  from '../../State/State';

function getScrollTop(
    currentScrollTop: number,
    optionOffsetTop: number,
    optionHeight: number,
    bodyHeight: number,
    scrollOffset: number
): number {
    const max = currentScrollTop + bodyHeight;

    let remainder: number;

    if (optionOffsetTop < currentScrollTop) {
        return optionOffsetTop - scrollOffset;
    } else if ((remainder = (optionOffsetTop + optionHeight) - max) > 0) {
        return currentScrollTop + remainder + scrollOffset;
    }

    return currentScrollTop;
}

function scrollToView(dom: Dom, timers: Timers, state: State, scrollToMiddle: boolean = false): void {
    const index = Math.max(0, state.focusedIndex > -1 ? state.focusedIndex : state.selectedIndex);
    const option = dom.option[index];

    if (!option) return;

    const offset = scrollToMiddle ? (state.maxBodyHeight / 2) - (option.offsetHeight / 2) : 0;

    const scrollTop = getScrollTop(
        dom.itemsList.scrollTop,
        option.offsetTop,
        option.offsetHeight,
        state.maxBodyHeight,
        offset
    );

    if (scrollTop === dom.itemsList.scrollTop) return;

    dom.itemsList.scrollTop = scrollTop;
}

export {
    getScrollTop,
    scrollToView as default
};