# EasyDropDown 4

[![Build Status](https://img.shields.io/travis/patrickkunka/easydropdown.svg?style=flat-square)](https://travis-ci.org/patrickkunka/easydropdown)
[![Coverage Status](https://img.shields.io/coveralls/patrickkunka/easydropdown.svg?style=flat-square)](https://coveralls.io/github/patrickkunka/easydropdown)
[![Latest Release](https://img.shields.io/npm/v/easydropdown.svg?style=flat-square)](https://www.npmjs.com/package/easydropdown)
[![Apache License](https://img.shields.io/npm/l/easydropdown.svg?style=flat-square)](https://www.apache.org/licenses/)

EasyDropDown transforms the humble `<select>` element into a blank canvas for your design and brand. As a drop-in enhancement, EasyDropDown maintains all the functionality and accessibility of a standard single-option select menu, while exposing a semantic DOM-structure that's easy to style and customize to the needs of your design.

EasyDropDown comes bundled with three ready-made [themes](./demos/themes) which can be used as a starting point for custom styling.

Check out the following [demos](https://demos.kunkalabs.com/easydropdown/) to see what's possible.

### Features
- Respects the native `<select>` element API*
- Full keyboard support (navigation, search and select)
- Emits native `change` events
- Enhanced placeholder support
- Form reset and validation support
- Collision detection
- Live updates
- Falls back to native UI on mobile devices
- Typescript/intellisense support
- ARIA-compliant-markup
- Support for IE9+, and all modern browsers.
- Lightweight at only 9kb gzipped

**EasyDropDown [does not support](#multiple-attribute-support) the `multiple` attribute.*

#### Contents

- [Installation](#installation)
- [Usage](#usage)
- [Anatomy of EasyDropDown](#anatomy-of-easydropdown)
- [API Methods](#configuration-options)
- [Configuration Options](#configuration-options)
- [React Example](#react-example)
- [CSS Modules Example](#css-modules-example)
- [Multiple Attribute Support](#multiple-attribute-support)

## Installation

Firstly, install the package using your package manager of choice.

```
npm install easydropdown --save
```

#### Module Import

You may then import the `easydropdown()` factory function into your project's modules.

```js
// ES Modules
import easydropdown from 'easydropdown';

// CommonJS
var easydropdown = require('easydropdown');

// AMD/RequireJS
define(['easydropdown/bundles/easydropdown.js'] , function (easydropdown) {
    ...
});
```

#### Script Tag

For basic projects without modular scoping or a build process, the most simple way to use EasyDropDown is via a `<script>` tag before your closing body tag. A pre-built "UMD" bundle is provided for this purpose which can be found in the `./bundle/easydropdown.js` file.

```html
    ...
    <script src="./path/to/easydropdown.min.js"/>
</body>
```

This will attach the `easydropdown` factory function to the `window` as a global.

## Usage

Because EasyDropDown is an enhancement on top of native the `<select>` element, we must firstly create the underlying select element in our project's HTML:

```html
<select name="foo">
    <option value="">Select</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    ...
</select>
```

Next, we instantiate EasyDropDown by passing a reference to the select element(s), or a selector string. We can either instantiate a single instance at a time, or a batch of instances.

#### Single-instance Instantiation

Firstly, obtain a reference the select DOM element. You can then pass this reference to the `easydropdown()` factory function as the first parameter. The factory function also accepts an optional second parameter of configuration options. See [Configuration Options](#configuration-options) for more information.

```js
const select = document.querySelector('[name="foo"]');

const edd = easydropdown(select);
// or: const edd = easydropdown('[name="foo"]');
```

As shown above, a reference to the dropdown instance  (`edd`) can be held onto in order to destroy it later, or interact with the dropdown programmatically.

This approach is recommended for any component-based architecture where only the component is concerned with the dropdown instance.

#### Batch Instantiation

For simple static pages/applications, we can use the `.all()` static method of the factory function to crawl the DOM for *all* `<select>` elements found in the document, and then batch instantiate EasyDropDown on each one.

```js
easydropdown.all();
```

The `all()` method also accepts an optional parameter of configuration options to be passed to each instance. See [Configuration Options](#configuration-options) for more information.

### Placeholder Functionality

With the exception of the [multiple attribute](#multiple-attribute), EasyDropDown supports all the available attributes of the native `<select>` element, such as `disabled`, `required` and `selected`. In addition to these, EasyDropDown adds a new "placeholder" attribute.

A common pattern when working with `<select>` elements, is to use the first `<option>` element as a placeholder value by giving it an empty `""` value, as the first option will always be selected by default. For example:

```html
<select name="foo">
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    ...
</select>
```

EasyDropDown enhances this pattern with the ability to add a `data-placeholder` attribute to this element to inform EasyDropDown that the option is a placeholder only and should *not* be an available selection once the user has selected a value.

```html
<select name="foo">
    <option value="" data-placeholder>Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    ...
</select>
```

Check out the [Basic List with Placeholder]() demo to see an example of this feature.

*NB: This feature should not be used if you want the user to be able to leave the field blank.*

Additionally, EasyDropDown can be configured to reshow the placeholder value after a value has been selected as a hint to the user whenever the dropdown is open. This is available via the `behavior.showPlaceholderWhenOpen` configuration option, and can be seen in the [Show Placeholder When Open]() demo.

## Anatomy of EasyDropDown

The DOM structure created by EasyDropDown is broken into 12 semantic components each with a unique class name which can be targeted for styling. Each component may also have one or more states which can again be used for styling via class names which are added and removed in response to interactions.

Each of the 12 components are shown on the following diagram, and described in detail below along with their respective states.

![](./docs/easydropdown-anatomy.png)

### Root

The "root" component forms the top level container of the dropdown, and supports several states which can be used to target the styling of child components.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------  | -------------------------- |
| Base        | `edd-root`            | `classNames.root`          |
| Open        | `edd-root-open`       | `classNames.rootOpen`      |
| Open above  | `edd-root-open-above` | `classNames.rootOpenAbove` |
| Open below  | `edd-root-open-below` | `classNames.rootOpenBelow` |
| Disabled    | `edd-root-disabled`   | `classNames.rootDisabled`  |
| Invalid     | `edd-root-invalid`    | `classNames.rootInvalid`   |
| Focused     | `edd-root-focused`    | `classNames.rootFocused`   |
| HasValue    | `edd-root-has-value`  | `classNames.rootHasValue`  |
| Native      | `edd-root-native`     | `classNames.rootNative`    |

### Head

The "head" component forms the top portion of the dropdown, and contains the current "value" and a presentational "arrow". When the head is clicked the "body" opens. When the dropdown is closed, only the head is visible.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-head`            | `classNames.head`          |

### Value

The "value" component contains the current (human-readable) value of the the dropdown. This may be a placeholder value, or the text content of the currently selected option.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-value`           | `classNames.value`         |

### Arrow

The "arrow" component can be used to communicate the open/closed state of the dropdown and also to provide an additional affordance for opening the dropdown. By using the "open" state on the "root" parent above, we can adjust the styling of the arrow based on whether or not the dropdown is open or closed.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-arrow`           | `classNames.arrow`         |

### Select

This is the actual select element passed to the `easydropdown()` factory function on instantiation. Once the dropdown markup has been generated, the original `select` element is appended to the head, and given the class name shown below (`'edd-select'` by default).

It is held inside the head in order to maintain tab-to-focus and various other keyboard-related functionality. For this reason, the `<select>` element must be invisible (e.g `opacity: 0`) but not hidden (e.g. `display: none`).

When in native mode, we can target the select element using the "native" state on the "root" parent above in order to ensure that the select element is clickable, and visible when open.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-select`          | `classNames.select`        |

### Body

The "body" forms the lower menu portion of the dropdown, and is shown and hidden based on whether the dropdown is open or closed.

The body should be hidden by default, and shown using a combination of the `open`, `openBelow` or `openAbove` class names added to the "root" component above. EasyDropDown will determine whether to apply the `openBelow` or `openAbove` class names based on collision detection using the height of the body.

| State       | Default Class         | Configuration Option        |
| ----------- | --------------------- | --------------------------- |
| Base        | `edd-body`            | `classNames.body`           |
| Scrollable  | `edd-body-scrollable` | `classNames.bodyScrollable` |
| At top      | `edd-body-at-top`     | `classNames.bodyAtTop`      |
| At bottom   | `edd-body-at-bottom`  | `classNames.bodyAtBotom`    |

### Gradient Top

The "gradient top" component can be used to apply a gradation to the top of the body to indicate that there are additional items above the visible area and create a scroll affordance. This can be shown or hidden based on the `bodyAtTop` class name applied to the "body" component above.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-gradient-top`    | `classNames.gradientTop`   |

### Gradient Bottom

The "gradient bottom" component can be used to apply a gradation to the bottom of the body to indicate that there are additional items below the visible area and create a scroll affordance. This can be shown or hidden based on the `bodyAtBottom` class name applied to the "body" component above.

| State       | Default Class         | Configuration Option        |
| ----------- | --------------------- | --------------------------- |
| Base        | `edd-gradient-bottom` | `classNames.gradientBottom` |

### Items List

The "items list" component holds all items in the dropdown, and is used to restrict the scrollable height of the body by applying `max-height` and `overflow: auto` styles.

When open, EasyDropDown will apply an inline `max-height` style to the items list component which is calculated based on the desired maximum visible items defined via the `behavior.maxVisibleItems` configuration option. This value may be further reduced to avoid collisions between the body and the viewport edge when the `behavior.clampMaxVisibleItems` configuration option is set.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-items-list`      | `classNames.itemsList`     |

### Group

"Group" components are used to wrap arbitrary groups of options, equivalent to the `<optgroup>` elements in the underyling `<select>` element.

Even when there are no `<optgroup>` elements present in the provided select, a single wrapping `group` component will still be present. Internally, this simplifies component logic by providing a consistent component hierarchy.

When a group is present intentionally, it will typically include a "group label" element describing the purpose of the group. Groups that contain a label have a `groupHasLabel` class which can be used to target the styling of their child options (adding indentation, for example).

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-group`           | `classNames.group`         |
| Disabled    | `edd-group-disabled`  | `classNames.groupDisabled` |
| Has label   | `edd-group-has-label` | `classNames.groupHasLabel` |

### Group Label

"Group label" components are added to groups derived from `<optgroup>` elements in the provided `<select>` element, and contain the value of the `label` attribute of the `<optgroup>`.

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-group-label`     | `classNames.groupLabel`    |

### Option

"Option" components make up the individual options of the dropdown menu. Additional classes are added when the option is in a "disabled", "focused", or "selected" state.

The focused state is added on mouseover, or on keyboard focus (via the up/down arrow keys). If an option is disabled, it is no longer focusable or selectable.

| State       | Default Class         | Configuration Option        |
| ----------- | --------------------- | --------------------------- |
| Base        | `edd-option`          | `classNames.option`         |
| Disabled    | `edd-option-disabled` | `classNames.optionDisabled` |
| Focused     | `edd-option-focused`  | `classNames.optionFocused`  |
| Selected    | `edd-option-selected` | `classNames.optionSelected` |

## Configuration Options

...

## API Methods

The easydropdown instances returned from the factory function expose several API methods for programmatic control of the dropdown, and instance destruction.

### open()

`.open()`

Programmatically opens the dropdown. Closes any other open instances.


```js

const edd = easydropdown('[name="foo"]');

edd.open();
```

### close()

`.close()`

Programmatically closes the dropdown.


```js

const edd = easydropdown('[name="foo"]');

edd.close();
```

### refresh()

`.refresh()`

Refreshes the instance and updates the DOM in response to a change in the underlying `<select>` element (for example, adding or removing an option).

When `behavior.liveUpdates` configuration option is set, this method is not neccessary, but can be used as a less-expensive alternative to polling the select for updates when we know exactly when it has been updated.

```js

const edd = easydropdown('[name="foo"]');

edd.refresh();
```

### destroy()

`.destroy()`

Destroys the instance by removing all EasyDropDown-generated elements from the DOM, and unbinding all event handlers. The underlying select is returned to the root position.

When using any kind of component-based framework (e.g. React), this method should always be called at the end of the lifecycle of your component in order to clean up (e.g, `componentWillUnmount()`).

```js

const edd = easydropdown('[name="foo"]');

edd.destroy();
```

## React Example

...

## CSS Modules Example

...

## Typescript Support

...

## Multiple Attribute Support

EasyDropDown **does not support** the `<select multple>` attribute by design. As anyone who's ever used the native browser implementation will know, a single vertical list is a very poor user interface for a selecting multiple options from a menu. It lacks any concept of ordering, and requires non-intuitive keyboard interaction.

There are far better solutions to this problem, typically involving two parallel lists, with drag-to-reorder functionality which is far beyond the scope of this library. EasyDropDown is not intended to solve this problem and was created to function as a simple **lightweight** solution for styling single-option select menus only. As such you should look elsewhere if you require multi-select functionality.