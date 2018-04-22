import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';

const body = (state: State, classNames: ClassNames) => (`
    <div class="${classNames.body}" ref="body">
    </div>
`);

export default body;