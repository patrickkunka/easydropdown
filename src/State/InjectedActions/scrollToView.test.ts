import {assert} from 'chai';

import createMockHandlerParams      from '../../Events/Mock/createMockHandlerParams';
import scrollToView, {getScrollTop} from './scrollToView';

describe('scrollToView()', () => {
    it('sets `state.isScrollingToView` then unsets it', async () => {
        const params = createMockHandlerParams();

        params.dom.option = [document.createElement('div')];
        params.dom.itemsList.scrollTop = 100;

        scrollToView(params.dom, params.timers, params.state);

        assert.isTrue(params.state.isScrollingToView);

        await new Promise(resolver => setTimeout(resolver, 100));

        assert.isFalse(params.state.isScrollingToView);
    });

    describe('getScrollTop()', () => {
        it(
            'scrolls to the top of the targeted option if less than the ' +
            'current `scrollTop`', () => {
                const scrollTop = getScrollTop(
                    100,
                    50,
                    30,
                    200,
                    0
                );

                assert.equal(scrollTop, 50);
            }
        );

        it(
            'scrolls to the top of the targeted option if greater than the ' +
            'current `scrollTop` plus the body heigt',
            () => {
                const scrollTop = getScrollTop(
                    100,
                    250,
                    30,
                    100,
                    0
                );

                assert.equal(scrollTop, 180);
            }
        );

        it('returns the current scrollTop if the target option is visible', () => {
            const scrollTop = getScrollTop(
                100,
                150,
                30,
                100,
                0
            );

            assert.equal(scrollTop, 100);
        });

        it('adds an offset to the targetted option if provided', () => {
            const scrollTop = getScrollTop(
                100,
                250,
                30,
                100,
                35
            );

            assert.equal(scrollTop, 215);
        });

        it('subtracts an offset from the targetted option if provided', () => {
            const scrollTop = getScrollTop(
                100,
                50,
                30,
                200,
                35
            );

            assert.equal(scrollTop, 15);
        });
    });
});