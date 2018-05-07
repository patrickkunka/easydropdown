import ClassNames       from '../Config/ClassNames';
import composeClassName from '../Shared/Util/composeClassName';
import State            from '../State/State';

import body from './body';
import head from './head';

const root = (state: State, classNames: ClassNames) => {
    const className = composeClassName([
        classNames.root,
        [state.isDisabled, classNames.rootDisabled],
        [state.isInvalid, classNames.rootInvalid],
        [state.isOpen, classNames.rootOpen],
        [state.isFocused, classNames.rootFocused],
        [state.hasValue, classNames.rootHasValue],
        [state.isOpenAbove, classNames.rootOpenAbove],
        [state.isOpenBelow, classNames.rootOpenBelow],
        [state.isUseNativeMode, classNames.rootNative]
    ]);

    return (`
        <div
            class="${className}"
            role="widget combobox"
            aria-haspopup="listbox"
            ${state.isOpen ? 'aria-expanded="true"' : ''}
            ${state.isRequired ? 'aria-required="true"' : ''}
            ${state.isDisabled ? 'aria-disabled="true"' : ''}
            ${state.isInvalid ? 'aria-invalid="true"' : ''}
        >
            ${head(state, classNames)}
            ${state.isUseNativeMode ? '' : body(state, classNames)}
        </div>
    `);
};

export default root;