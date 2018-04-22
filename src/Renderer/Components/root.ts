import ClassNames from '../../Config/ClassNames';
import State      from '../../State/State';
import body       from './body';
import head       from './head';

const root = (state: State, classNames: ClassNames) => (`
    <div class="${classNames.root}">
        ${head(state, classNames)}
        ${body(state, classNames)}
    </div>
`);

export default root;