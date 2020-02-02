Changelog
=========

## 4.2.0
- Fixes issue where native select UI would be shown on iOS, regardless of whether `behavior.useNativeUiOnMobile` was set to `false`.
- Adds a `.validate()` method to programmatically validate an instance, and a new demo (#16).
- Adds a new callback `onOptionClick`.

## 4.1.1
- Fixes issue introduced in 4.1.0 where UI no longer closed on select by default
- Fixes issue introduced in 4.1.0 where clicking an option while `behavior.openOnFocus` set would close the UI without selecting any option.

## 4.1.0
- Fixes a styling issue in Beanstalk and Ivy themes where native select element was discoverable on click to the left of the head element.
- Fixes the `behavior.closeOnSelect` configuration option which not previously implemented internally.
- Adds ensures that when `behavior.openOnFocus` is set, that selects also close on `blur`.
- Updates and locks dependencies.

## 4.0.5

- Fixes a styling issue with Firefox which caused a long scrolling page to scroll to the top when a dropdown is focused.

## 4.0.4

- Fixes a styling issue with Firefox which caused the `head` element to jump when focused.