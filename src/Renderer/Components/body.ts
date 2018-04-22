import ClassNames       from '../../Config/ClassNames';
import composeClassName from '../../Shared/Util/composeClassName';
import State            from '../../State/State';
import group            from './group';

const body = (state: State, classNames: ClassNames) => {
    const className = composeClassName([
        classNames.body,
        [state.isAtTop, classNames.bodyAtTop],
        [state.isAtBottom, classNames.bodyAtBottom]
    ]);

    return (`
        <div class="${className}" ref="body">
            <div class="${classNames.itemsList}" ref="itemsList">
                ${state.groups.map(groupState => group(groupState, state, classNames)).join('')}
            </div>
        </div>
    `);
};

export default body;