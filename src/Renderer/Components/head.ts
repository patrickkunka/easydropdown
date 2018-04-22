import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';

const head = (state: State, classNames: ClassNames) => (`
    <div class="${classNames.head}" ref="head">
    </div>
`);

export default head;