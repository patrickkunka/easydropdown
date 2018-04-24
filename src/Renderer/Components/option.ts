import ClassNames       from '../../Config/ClassNames';
import composeClassName from '../../Shared/Util/composeClassName';
import Option           from '../../State/Option';
import State            from '../../State/State';

function option(optionState: Option, state: State, classNames: ClassNames): string {
    const className = composeClassName([
        classNames.option,
        [optionState === state.selectedOption, classNames.optionSelected],
        [optionState === state.focusedOption, classNames.optionFocused],
        [optionState.isDisabled, classNames.optionDisabled]
    ]);

    return `<div class="${className}" data-ref="option" title="${optionState.label}">${optionState.label}</div>`;
}

export default option;