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
- Focus/blur support
- Emits native `change` event
- `reset` event support
- Form validation support
- `<optgroup>` support
- Disabled `<option>`, `<optgroup>`, and `<select>` support
- Collision detection
- Live updates
- Falls back to native UI on mobile devices
- Highly configurable
- Full Typescript/Intellisense Support
- ARIA-compliant-markup
- Support for IE9+, and all modern browsers.
- Lightweight at only 9kb gzipped

#### Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration Options](#configuration-options)
- [React Example](#react-example)
- [CSS Modules Example](#css-modules-example)

## Installation

Firstly, install the package using your package manager of choice.

```
npm install easydropdown --save
```

You may then import the `easydropdown()` factory function into your project's modules.

```js
import easydropdown from 'easydropdown';
```

#### Script Tag

For basic projects without modular scoping or a build process, the most simple way to use EasyDropDown is via a `<script>` tag before your closing body tag. A pre-built "UMD" bundle is provided for this purpose which can be found in the `./bundle/easydropdown.min.js` file.

```html
    ...
    <script src="./path/to/easydropdown/bundle/easydropdown.min.js"/>
</body>
```

This will attach the `easydropdown` factory function to the `window` as a global. If you require AMD/RequireJS support, this bundle may be also be directly imported for that purpose.

## Usage

Because EasyDropDown is an enhancement on top of native `<select>` elements, the first step of any EasyDropDown project is to create the underlying `<select>` element, and mark it up as you normally would.

Next, you need to instantiate EasyDropDown on your native select element(s). There are two possible ways to do this:

### Single Select Instantiation

Firstly, obtain a reference the select DOM element. You can then pass this reference to the `easydropdown()` factory function as the first parameter. The factory function also accepts an optional second parameter of configuration options which will be described later.

```js
import easydropdown from 'easydropdown';

const select = document.querySelector('#test-select');

const edd = easydropdown(select);
```

As shown above, a reference to the dropdown instance should be held onto in order to destroy it later, or interact with the dropdown programmatically.

This approach is recommended for any component-based architecture where your component should not know anything about the rest of the application.

### Batch Instantiation

For simple static pages/applications, we can use the `.all()` static method of the factory function to crawl the DOM for *all* `<select>` elements found in the document, then batch instantiate EasyDropDown on each one.

```js
import easydropdown from 'easydropdown';

asydropdown.all();
```

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