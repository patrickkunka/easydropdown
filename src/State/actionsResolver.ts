import BodyStatus   from './Constants/BodyStatus';
import ScrollStatus from './Constants/ScrollStatus';
import IActions     from './Interfaces/IActions';
import State        from './State';

const actionsResolver = (state: State): IActions => ({
    focus() {
        state.isFocused = true;
    },

    blur() {
        state.isFocused = false;
    },

    invalidate() {
        state.isInvalid = true;
    },

    validate() {
        state.isInvalid = false;
    },

    topOut() {
        state.scrollStatus = ScrollStatus.AT_TOP;
    },

    bottomOut() {
        state.scrollStatus = ScrollStatus.AT_BOTTOM;
    },

    scroll() {
        state.scrollStatus = ScrollStatus.SCROLLED;
    },

    openAbove() {
        state.bodyStatus = BodyStatus.OPEN_ABOVE;
    },

    openBelow() {
        state.bodyStatus = BodyStatus.OPEN_BELOW;
    },

    close() {
        state.bodyStatus = BodyStatus.CLOSED;
    },

    selectOption(index) {
        state.selectedIndex = index;
    },

    focusOption(index) {
        state.focusedIndex = index;
    }
});

export default actionsResolver;