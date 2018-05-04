import {assert}    from 'chai';
import {spy, stub} from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectKeypress from './handleSelectKeypress';

describe('handleSelectKeypress()', () => {
    it('calls `actions.search()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const searchSpy = spy(params.actions, 'search');

        handleSelectKeypress(mockEvent, params);

        assert.isTrue(searchSpy.called);
    });

    it('aborts if `state.isUseNativeMode` is set', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const searchSpy = spy(params.actions, 'search');

        params.state.isUseNativeMode = true;

        handleSelectKeypress(mockEvent, params);

        assert.isFalse(searchSpy.called);
    });

    it('resets the search timer', () => {
        const clearTimeoutStub = stub(window, 'clearTimeout');
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.timers.searchTimeoutId = 1;

        handleSelectKeypress(mockEvent, params);

        assert.isTrue(clearTimeoutStub.calledWith(1));

        clearTimeoutStub.restore();
    });

    it('calls `actions.resetSearch()` after a defined duration', async () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const resetSearchSpy = spy(params.actions, 'resetSearch');
        const duration = 10;

        handleSelectKeypress(mockEvent, params, duration);

        await new Promise(resolver => setTimeout(resolver, duration));

        assert.isTrue(resetSearchSpy.called);
    });
});
