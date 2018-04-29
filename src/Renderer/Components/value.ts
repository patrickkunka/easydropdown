import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';

const value = (state: State, classNames: ClassNames) => {
    return (`
        <div class="${classNames.value}" data-ref="value">
            ${state.humanReadableValue}
        </div>
    `);
};

export default value;