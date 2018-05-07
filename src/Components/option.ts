import ClassNames       from '../Config/ClassNames';
import composeClassName from '../Shared/Util/composeClassName';
import Option           from '../State/Option';
import State            from '../State/State';

function option(optionState: Option, state: State, classNames: ClassNames): string {
    const isSelected = state.selectedOption === optionState;

    const className = composeClassName([
        classNames.option,
        [isSelected, classNames.optionSelected],
        [optionState === state.focusedOption, classNames.optionFocused],
        [optionState.isDisabled, classNames.optionDisabled]
    ]);

    return (`
        <div
            class="${className}"
            data-ref="option item"
            role="option"
            title="${optionState.label}"
            ${isSelected ? 'aria-selected="true"' : ''}
            ${optionState.isDisabled ? 'aria-disabled="true"' : ''}
            >
                ${optionState.label}
        </div>
    `);
}

export default option;