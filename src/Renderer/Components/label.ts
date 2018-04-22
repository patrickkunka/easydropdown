import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';

const label = (state: State, classNames: ClassNames) => (`
    <div class="${classNames.label}" ref="label">
        ${state.hasValue ? state.label : state.placeholder}
    </div>
`);

export default label;