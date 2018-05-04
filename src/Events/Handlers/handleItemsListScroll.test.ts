import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleItemsListScroll from './handleItemsListScroll';

describe('handleItemsListScroll()', () => {
    it('calls `stopPropagation()` on the provided event', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleItemsListScroll(mockEvent, params);

        assert.isTrue(mockEvent.stopPropagation.called);
    });

    it('calls `actions.topOut()` when scrolled to top', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const topOutSpy = spy(params.actions, 'topOut');

        params.dom.itemsList = {
            scrollTop: 0
        } as any;

        handleItemsListScroll(mockEvent, params);

        assert.isTrue(topOutSpy.called);
    });

    it('calls `actions.bottomOut()` when scrolled to bottom', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const bottomOutSpy = spy(params.actions, 'bottomOut');

        params.dom.itemsList = {
            scrollTop: 100,
            scrollHeight: 200,
            offsetHeight: 100
        } as any;

        handleItemsListScroll(mockEvent, params);

        assert.isTrue(bottomOutSpy.called);
    });

    it('calls `actions.scroll()` when scrolled between the top and bottom', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const scrollSpy = spy(params.actions, 'scroll');

        params.dom.itemsList = {
            scrollTop: 50,
            scrollHeight: 200,
            offsetHeight: 100
        } as any;

        handleItemsListScroll(mockEvent, params);

        assert.isTrue(scrollSpy.called);
    });
});
