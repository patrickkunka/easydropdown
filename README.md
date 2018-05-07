# EasyDropDown 4

[![Build Status](https://img.shields.io/travis/patrickkunka/easydropdown.svg?style=flat-square)](https://travis-ci.org/patrickkunka/easydropdown)
[![Coverage Status](https://img.shields.io/coveralls/patrickkunka/easydropdown.svg?style=flat-square)](https://coveralls.io/github/patrickkunka/easydropdown)
[![Latest Release](https://img.shields.io/npm/v/easydropdown.svg?style=flat-square)](https://www.npmjs.com/package/easydropdown)
[![Apache License](https://img.shields.io/npm/l/easydropdown.svg?style=flat-square)](https://www.apache.org/licenses/)

EasyDropDown transforms the humble `<select>` element into a blank canvas for your design and brand. As a drop-in enhancement, EasyDropDown maintains all the functionality and accessibility of a standard single-option select menu, while exposing a semantic DOM-structure that's easy to style and customize to the needs of your design.

Check out the following [demos](https://demos.kunkalabs.com/easydropdown/) to see what's possible.

### Features
- Respects the native `<select>` element API
- Full keyboard support (navigation, search and select)
- Emits native `change` event
- Form `reset` and validation support
- `<optgroup>` support
- `<option>`, `<optgroup>`, and `<select>`-level `disable` support
- Collision detection
- Live updates
- Falls back to native UI on mobile devices
- Full Typescript/Intellisense Support
- ARIA-compliant-markup
- Support for IE9+, and all modern browsers.
- Lightweight at only 9kb gzipped

#### Contents

- [Installation](#installation)
- [Usage](#usage)
- [Anatomy of EasyDropDown](#anatomy-of-easydropdown)
- [Configuration Options](#configuration-options)
- [React Example](#react-example)
- [CSS Modules Example](#css-modules-example)

## Installation

Firstly, install the package using your package manager of choice.

```
npm install easydropdown --save
```

#### Module Import

You may then import the `easydropdown()` factory function into your project's modules.

```js
import easydropdown from 'easydropdown';
```


```js
var easydropdown = = require('easydropdown');
```

#### Script Tag

For basic projects without modular scoping or a build process, the most simple way to use EasyDropDown is via a `<script>` tag before your closing body tag. A pre-built "UMD" bundle is provided for this purpose which can be found in the `./bundle/easydropdown.min.js` file.

```html
    ...
    <script src="./path/to/easydropdown.min.js"/>
</body>
```

This will attach the `easydropdown` factory function to the `window` as a global. If you require AMD support for RequireJS, this bundle may be also be directly imported for that purpose.

## Usage

Because EasyDropDown is an enhancement on top of native the `<select>` element, we must firstly create the underlying select element in our project's HTML:

```html
<select name="foo">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
    ...
</select>
```

Next, we instantiate EasyDropDown by passing a reference to the select element(s), or a selector string. There are two ways to do this:

### Single Instance Instantiation

Firstly, obtain a reference the select DOM element. You can then pass this reference to the `easydropdown()` factory function as the first parameter. The factory function also accepts an optional second parameter of configuration options which will be described later.

```js
import easydropdown from 'easydropdown';

const select = document.querySelector('[name="foo"]');

const edd = easydropdown(select);
```

As shown above, a reference to the dropdown instance  (`edd`) can be held onto in order to destroy it later, or interact with the dropdown programmatically.

This approach is recommended for any component-based architecture where only the component is concerned with the dropdown instance.

### Batch Instantiation

For simple static pages/applications, we can use the `.all()` static method of the factory function to crawl the DOM for *all* `<select>` elements found in the document, andvthen batch instantiate EasyDropDown on each one.

```js
import easydropdown from 'easydropdown';

easydropdown.all();
```

## Anatomy of EasyDropDown

The DOM structure created by EasyDropDown is broken into 12 semantic components each with a unique class name which can be targeted for styling. Each component may also have one or more states which can again be used for styling via class names which are added and removed in response to interactions.

Each of the 12 components are their respective states are shown on the following diagram, and described in detail below.

#### Root

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

#### Head

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-head`            | `classNames.head`          |

#### Value

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-value`           | `classNames.value`         |

#### Arrow

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-arrow`           | `classNames.arrow`         |

#### Select

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-select`          | `classNames.select`        |

#### Body

| State       | Default Class         | Configuration Option        |
| ----------- | --------------------- | --------------------------- |
| Base        | `edd-body`            | `classNames.body`           |
| Scrollable  | `edd-body-scrollable` | `classNames.bodyScrollable` |
| At top      | `edd-body-at-top`     | `classNames.atTop`          |
| At bottom   | `edd-body-at-bottom`  | `classNames.atBotom`        |

#### Gradient Top

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-gradient-top`    | `classNames.gradientTop`   |

#### Gradient Bottom

| State       | Default Class         | Configuration Option        |
| ----------- | --------------------- | --------------------------- |
| Base        | `edd-gradient-bottom` | `classNames.gradientBottom` |

#### Items List

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-items-list`      | `classNames.itemsList`     |

#### Group

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-group`           | `classNames.group`         |
| Disabled    | `edd-group-disabled`  | `classNames.groupDisabled` |
| Has label   | `edd-group-has-label` | `classNames.groupHasLabel` |

#### Group Label

| State       | Default Class         | Configuration Option       |
| ----------- | --------------------- | -------------------------- |
| Base        | `edd-group-label`     | `classNames.groupLabel`    |

#### Option

| State       | Default Class         | Configuration Option        |
| ----------- | --------------------- | --------------------------- |
| Base        | `edd-option`          | `classNames.option`         |
| Disabled    | `edd-option-disabled` | `classNames.optionDisabled` |
| Focused     | `edd-option-focused`  | `classNames.optionFocused`  |
| Selected    | `edd-option-selected` | `classNames.optionSelected` |

## Configuration Options

...

## React Example

...

## CSS Modules Example

...

## Typescript Support

...

## Multiple Attribute

EasyDropDown does not support the `<select multple>` attribute by design. As anyone who's ever used the native browser implementation will know, a single vertical list is a very poor user interface for a selecting multiple options from a menu. It lacks any concept of ordering, and requires non-intuitive keyboard interaction.

There are far better solutions to this problem, typically involving two parallel lists, with drag-to-reorder functionality. EasyDropDown is not intended to solve this problem and was created to function as a simple **lightweight** solution for styling single-option select menus only. As such you should look elsewhere if you require multi-select functionality.