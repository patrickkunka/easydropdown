interface IBehavior {
    /**
     * A boolean dictating whether or not to further
     * reduce the `maxVisibleItems` value of the dropdown
     * menu when a collision occurs.
     *
     * @default true
     */

    clampMaxVisibleItems?: boolean;

    /**
     * A boolean dictating whether or not the dropdown
     * should close when a value is selected.
     *
     * @default true
     */

    closeOnSelect?: boolean;

    /**
     * A boolean dictating whether or not the dropdown should
     * watch for updates to the underyling `<select>` element
     * and reactively update itself. For example, when an
     * `<option>` is added or removed, or the `disabled`
     * attribute is toggled on.
     *
     * @default false
     */

    liveUpdates?: boolean;

    /**
     * A boolean dictating whether or not the user should be
     * able to loop from the top of the menu to the bottom
     * (and vice-versa) when changing the focused option by
     * pressing the up/down arrow keys.
     *
     * @default false
     */

    loop?: boolean;

    /**
     * An integer dictating the maximum visible options
     * that should be visible in the dropdown body before
     * limiting its height and forcing the user to scroll.
     *
     * @default 15
     */

    maxVisibleItems?: number;

    /**
     * A boolean dictating whether or not the dropdown
     * should open automatically whenever it gains focus.
     *
     * @default false
     */

    openOnFocus?: boolean;

    /**
     * A boolean dictating whether or not the placeholder text
     * (if provided) should be shown whenever the dropdown is
     * open (even once a value has been selected).
     *
     * @default false
     */

    showPlaceholderWhenOpen?: boolean;

    /**
     * A boolean dictating whether or not to fall back to
     * the native `<select>` UI on mobile devices (while
     * maintaing a styled "head").
     *
     * @default true
     */

    useNativeUiOnMobile?: boolean;
}

export default IBehavior;