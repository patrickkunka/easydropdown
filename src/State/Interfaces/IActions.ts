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
    open(collision: CollisionType, optionHeight: number): void;
    close(): void;
    selectOption(index: number): void;
    focusOption(index: number): void;
    closeOthers?(): void;
    scrollToView?(stateProxy: State): void;
}

export default IActions;