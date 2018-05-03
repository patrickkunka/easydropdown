import ICollisionData from '../../Shared/Util/Interfaces/ICollisionData';
import State          from '../State';

interface IActions {
    focus(): void;
    blur(): void;
    invalidate(): void;
    validate(): void;
    topOut(): void;
    bottomOut(): void;
    scroll(): void;
    setOptionHeight(optionHeight: number): void;
    open(
        collisionData: ICollisionData,
        getIsScrollableStatus: () => boolean,
        optionHeight: number
    ): void;
    close(): void;
    makeScrollable(): void;
    makeUnscrollable(): void;
    selectOption(index: number): void;
    focusOption(index: number, shouldScrollToView?: boolean): void;
    search(): void;
    resetSearch(): void;
    keying(): void;
    resetKeying(): void;
    useNative(): void;
    closeOthers?(): void;
    scrollToView?(stateProxy: State, scrollToMiddle?: boolean): void;
}

export default IActions;