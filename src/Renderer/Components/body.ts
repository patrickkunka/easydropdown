import ClassNames       from '../../Config/ClassNames';
import composeClassName from '../../Shared/Util/composeClassName';
import State            from '../../State/State';
import group            from './group';

function body(state: State, classNames: ClassNames): string {
    const className = composeClassName([
        classNames.body,
        [state.isAtTop, classNames.bodyAtTop],
        [state.isAtBottom, classNames.bodyAtBottom]
    ]);

    return (`
        <div class="${className}" data-ref="body">
            <div class="${classNames.itemsList}" data-ref="itemsList" style="max-height: ${state.maxBodyHeight}px;">
                ${state.groups.map(groupState => group(groupState, state, classNames)).join('')}
            </div>
        </div>
    `);
}

export default body;