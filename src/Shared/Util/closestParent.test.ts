import {assert} from 'chai';

import closestParent from './closestParent';

describe('closestParent()', () => {
    it('returns the provided element if matching, and `includeSelf` set', () => {
        const el = document.createElement('div');

        const output = closestParent(el, 'div', true);

        assert.equal(el, output);
    });

    it('returns `null` if no parent matches', () => {
        const el = document.createElement('div');
        const parent = document.createElement('section');

        parent.appendChild(el);

        const output = closestParent(el, 'div');

        assert.isNull(output);
    });

    it('returns `null` if the parent is the `<body>`', () => {
        const el = document.createElement('div');

        document.body.appendChild(el);

        const output = closestParent(el, 'div');

        assert.isNull(output);

        document.body.removeChild(el);
    });

    it('traverses up the DOM until a matching parent is found', () => {
        const el = document.createElement('div');
        const parent = document.createElement('section');
        const grandParent = document.createElement('div');

        grandParent.classList.add('foo');

        parent.appendChild(el);
        grandParent.appendChild(parent);

        const output = closestParent(el, '.foo');

        assert.equal(output, grandParent);
    });
});
