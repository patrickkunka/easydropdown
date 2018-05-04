import CollisionType  from '../Shared/Util/Constants/CollisionType';
import ICollisionData from '../Shared/Util/Interfaces/ICollisionData';

import BodyStatus   from './Constants/BodyStatus';
import ScrollStatus from './Constants/ScrollStatus';
import IActions     from './Interfaces/IActions';
import State        from './State';

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

    open(
        this: IActions,
        collisionData: ICollisionData,
        getIsScrollableStatus: () => boolean,
        optionHeight: number
    ): void {
        if (state.isDisabled) return;

        this.setOptionHeight(optionHeight);
        this.closeOthers();

        state.maxVisibleOptionsOverride = collisionData.maxVisibleOptionsOverride;

        switch (collisionData.type) {
            case CollisionType.NONE:
            case CollisionType.TOP:
                state.bodyStatus = BodyStatus.OPEN_BELOW;

                break;
            case CollisionType.BOTTOM:
                state.bodyStatus = BodyStatus.OPEN_ABOVE;

                break;
        }

        window.requestAnimationFrame(() => {
            const isScrollable = getIsScrollableStatus();

            if (isScrollable && !state.isScrollable) {
                this.makeScrollable();
            } else if (!isScrollable && state.isScrollable) {
                this.makeUnscrollable();
            }

            this.scrollToView(state, true);
        });
    },

    close(): void {
        state.bodyStatus = BodyStatus.CLOSED;
        state.focusedIndex = -1;
    },

    selectOption(this: IActions, index: number): void {
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

    focusOption(this: IActions, index: number, shouldScrollToView: boolean = false): void {
        const scrollToMiddle = Math.abs(index - state.focusedIndex) > 1;

        state.focusedIndex = index;

        if (shouldScrollToView) {
            this.scrollToView(state, scrollToMiddle);
        }
    },

    search(): void {
        state.isSearching = true;
    },

    resetSearch(): void {
        state.isSearching = false;
    },

    keying(): void {
        state.isKeying = true;
    },

    resetKeying(): void {
        state.isKeying = false;
    },

    useNative(): void {
        state.isUseNativeMode = true;
    }
});

export default resolveActions;