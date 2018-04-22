import {assert} from 'chai';

import composeClassName from './composeClassName';

describe('composeClassName()', () => {
    it('produces a compound classname based on the provided tokens', () => {
        const className = composeClassName([
            'foo',
            [true, 'bar'],
            [false, 'baz']
        ]);

        assert.equal(className, 'foo bar');
    });
});
