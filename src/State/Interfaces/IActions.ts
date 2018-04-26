import CollisionType from '../Constants/CollisionType';
import State         from '../State';

interface IActions {
    focus(): void;
    blur(): void;
    invalidate(): void;
    validate(): void;
    topOut(): void;
    bottomOut(): void;
    scroll(): void;
    setOptionHeight(optionHeight: number): void;
    open(collision: CollisionType): void;
    close(): void;
    selectOption(index: number): void;
    focusOption(index: number): void;
    search(): void;
    resetSearch(): void;
    closeOthers?(): void;
    scrollToView?(stateProxy: State): void;
}

export default IActions;