interface IBehavior {
    showPlaceholderWhenOpen?: boolean;
    openOnFocus?:             boolean;
    closeOnSelect?:           boolean;
    useNativeUiOnMobile?:     boolean;
    loop?:                    boolean;
    clampMaxVisibleOptions?:  boolean;
    reactToUpdates?:          boolean;
    maxVisibleOptions?:       number;
}

export default IBehavior;