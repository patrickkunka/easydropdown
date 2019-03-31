import CollisionType  from '../../Shared/Util/Constants/CollisionType';
import State          from '../State';

interface IActions {
    focus(): void;
    blur(): void;
    invalidate(): void;
    validate(): void;
    topOut(): void;
    bottomOut(): void;
    scroll(): void;
    open(
        maxBodyHeight: number,
        collisionType: CollisionType,
        isScrollable: boolean
    ): void;
    close(): void;
    makeScrollable(): void;
    makeUnscrollable(): void;
    startClickSelecting(): void;
    selectOption(index: number, close?: boolean): void;
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