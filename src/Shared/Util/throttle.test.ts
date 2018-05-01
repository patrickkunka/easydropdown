import {assert} from 'chai';
import {spy} from 'sinon';

import throttle from './throttle';

describe('throttle()', () => {
    it('calls the provided function once immediately', () => {
        const fn = spy();
        const throttled = throttle(fn, 100);

        throttled();
        throttled();
        throttled();

        assert.isTrue(fn.calledOnce);
    });

    it('calls the provided function once per the provided duration', async () => {
        const fn = spy();
        const throttled = throttle(fn, 10);

        throttled('A');
        throttled('B');
        throttled('C');

        assert.isTrue(fn.calledOnce);
        assert.isTrue(fn.calledWith('A'));

        await new Promise(resolver => setTimeout(resolver, 11));

        assert.isTrue(fn.calledTwice);
        assert.isTrue(fn.calledWith('C'));
    });
});