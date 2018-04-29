interface IBehavior {
    showPlaceholderOnOpen:  boolean;
    openOnFocus:            boolean;
    closeOnSelect:          boolean;
    useNativeUiOnMobile:    boolean;
    loop:                   boolean;
    clampMaxVisibleOptions: boolean;
    observeMutations:       boolean;
    maxVisibleOptions:      number;
}

export default IBehavior;