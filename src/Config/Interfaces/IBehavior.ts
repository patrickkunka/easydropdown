interface IBehavior {
    showPlaceholderOnOpen: boolean;
    openOnFocus:           boolean;
    closeOnSelect:         boolean;
    useNativeUiOnMobile:   boolean;
    maxVisibleOptions:     number;
}

export default IBehavior;