interface IBehavior {
    showPlaceholderOnOpen:  boolean;
    openOnFocus:            boolean;
    closeOnSelect:          boolean;
    useNativeUiOnMobile:    boolean;
    loop:                   boolean;
    clampMaxVisibleOptions: boolean;
    maxVisibleOptions:      number;
}

export default IBehavior;