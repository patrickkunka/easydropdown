import IClassNames from './Interfaces/IClassNames';

class ClassNames implements IClassNames {
    public root:           string = 'edd-root';
    public rootOpen:       string = 'edd-root-open';
    public rootOpenAbove:  string = 'edd-root-open-above';
    public rootOpenBelow:  string = 'edd-root-open-below';
    public rootDisabled:   string = 'edd-root-disabled';
    public rootInvalid:    string = 'edd-root-invalid';
    public rootFocused:    string = 'edd-root-focused';
    public rootHasValue:   string = 'edd-root-has-value';
    public rootNative:     string = 'edd-root-native';
    public gradientTop:    string = 'edd-gradient-top';
    public gradientBottom: string = 'edd-gradient-bottom';
    public head:           string = 'edd-head';
    public value:          string = 'edd-value';
    public arrow:          string = 'edd-arrow';
    public select:         string = 'edd-select';
    public body:           string = 'edd-body';
    public bodyScrollable: string = 'edd-body-scrollable';
    public bodyAtTop:      string = 'edd-body-at-top';
    public bodyAtBottom:   string = 'edd-body-at-bottom';
    public itemsList:      string = 'edd-items-list';
    public group:          string = 'edd-group';
    public groupDisabled:  string = 'edd-group-disabled';
    public groupHasLabel:  string = 'edd-group-has-label';
    public groupLabel:     string = 'edd-group-label';
    public option:         string = 'edd-option';
    public optionDisabled: string = 'edd-option-disabled';
    public optionFocused:  string = 'edd-option-focused';
    public optionSelected: string = 'edd-option-selected';

    constructor() {
        Object.seal(this);
    }
}

export default ClassNames;