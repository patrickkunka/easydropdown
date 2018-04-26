import BodyStatus    from './Constants/BodyStatus';
import CollisionType from './Constants/CollisionType';
import ScrollStatus  from './Constants/ScrollStatus';
import IActions      from './Interfaces/IActions';
import State         from './State';

const resolveActions = (state: State): IActions => ({
    focus(): void {
        state.isFocused = true;
    },

    blur(): void {
        state.isFocused = false;
    },

    invalidate(): void {
        state.isInvalid = true;
    },

    validate(): void {
        state.isInvalid = false;
    },

    topOut(): void {
        state.scrollStatus = ScrollStatus.AT_TOP;
    },

    bottomOut(): void {
        state.scrollStatus = ScrollStatus.AT_BOTTOM;
    },

    scroll(): void {
        state.scrollStatus = ScrollStatus.SCROLLED;
    },

    makeScrollable(): void {
        state.isScrollable = true;
    },

    makeUnscrollable(): void {
        state.isScrollable = false;
    },

    setOptionHeight(optionHeight: number): void {
        state.optionHeight = optionHeight;
    },

    open(this: IActions, collision: CollisionType): void {
        this.closeOthers();
        this.scrollToView(state);

        switch (collision) {
            case CollisionType.NONE:
            case CollisionType.TOP:
                state.bodyStatus = BodyStatus.OPEN_BELOW;

                break;
            case CollisionType.BOTTOM:
                state.bodyStatus = BodyStatus.OPEN_ABOVE;

                break;
        }
    },

    close(): void {
        state.bodyStatus = BodyStatus.CLOSED;
        state.focusedIndex = -1;
    },

    selectOption(index: number): void {
        state.selectedIndex = index;

        if (state.isInvalid) {
            this.validate();
        }

        if (state.isSearching) {
            this.scrollToView(state);
        } else {
            this.close();
        }
    },

    focusOption(index: number): void {
        state.focusedIndex = index;

        this.scrollToView(state);
    },

    search(): void {
        state.isSearching = true;
    },

    resetSearch(): void {
        state.isSearching = false;
    }
});

export default resolveActions;