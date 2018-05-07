import ClassNames       from '../Config/ClassNames';
import composeClassName from '../Shared/Util/composeClassName';
import Group            from '../State/Group';
import State            from '../State/State';

import option from './option';

const group = (groupState: Group, state: State, classNames: ClassNames) => {
    const className = composeClassName([
        classNames.group,
        [groupState.isDisabled, classNames.groupDisabled],
        [groupState.hasLabel, classNames.groupHasLabel]
    ]);

    return (`
        <div class="${className}" data-ref="group" role="group">
            ${groupState.hasLabel ?
                `<div class="${classNames.groupLabel}" data-ref="item">${groupState.label}</div>` : ''
            }
            ${groupState.options.map(optionState => option(optionState, state, classNames)).join('')}
        </div>
    `);
};

export default group;