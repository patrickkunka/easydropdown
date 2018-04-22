import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';
import arrow      from './arrow';
import label      from './label';

const head = (state: State, classNames: ClassNames) => (`
    <div class="${classNames.head}" ref="head">
        ${label(state, classNames)}
        ${arrow(state, classNames)}
    </div>
`);

export default head;