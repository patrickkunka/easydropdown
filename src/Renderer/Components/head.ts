import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';
import arrow      from './arrow';
import label      from './label';

const head = (state: State, classNames: ClassNames) => (`
    <div class="${classNames.head}" data-ref="head">
        ${label(state, classNames)}
        ${arrow(state, classNames)}
        <select class="${classNames.select}" data-ref="select"></select>
    </div>
`);

export default head;