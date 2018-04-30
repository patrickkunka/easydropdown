import {assert} from 'chai';

import Dom                from '../../Renderer/Dom';
import detectIsScrollable from './detectIsScrollable';

const createMockDom = (
    scrollHeight: number,
    offsetHeight: number
): Dom => {
    const dom = new Dom();

    dom.itemsList = {scrollHeight} as any;

    dom.body = {offsetHeight} as any;

    return dom;
};

describe('detectIsScrollable()', () => {
    it('returns `true` is the `scrollHeight` is greater than the `offsetHeight`', () => {
        const dom = createMockDom(101, 100);

        const isScrollable = detectIsScrollable(dom);

        assert.isTrue(isScrollable);
    });

    it('returns `false` is the `scrollHeight` is equal to `offsetHeight`', () => {
        const dom = createMockDom(100, 100);

        const isScrollable = detectIsScrollable(dom);

        assert.isFalse(isScrollable);
    });

    it('returns `false` is the `scrollHeight` is less than the `offsetHeight`', () => {
        const dom = createMockDom(99, 100);

        const isScrollable = detectIsScrollable(dom);

        assert.isFalse(isScrollable);
    });
});

export {createMockDom};
