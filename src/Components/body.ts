import ClassNames       from '../Config/ClassNames';
import composeClassName from '../Shared/Util/composeClassName';
import State            from '../State/State';

import group from './group';

function body(state: State, classNames: ClassNames): string {
    const className = composeClassName([
        classNames.body,
        [state.isAtTop, classNames.bodyAtTop],
        [state.isAtBottom, classNames.bodyAtBottom],
        [state.isScrollable, classNames.bodyScrollable]
    ]);

    const styleAttr = state.isOpen ?
        `style="max-height: ${state.maxBodyHeight}px;"` : '';

    return (`
        <div
            class="${className}"
            data-ref="body"
            role="listbox"
            ${state.isOpen ? '' : 'aria-hidden'}
        >
            <div class="${classNames.itemsList}"
                data-ref="itemsList"
                ${styleAttr}>
                ${state.groups.map(groupState => group(groupState, state, classNames)).join('')}
            </div>
            <div class=${classNames.gradientTop} role="presentation"></div>
            <div class=${classNames.gradientBottom} role="presentation"></div>
        </div>
    `);
}

export default body;