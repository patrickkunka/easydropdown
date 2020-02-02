import {assert} from 'chai';
import {spy}    from 'sinon';

import BodyStatus              from '../../State/Constants/BodyStatus';
import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleHeadClick, {handleHeadClick as unboundHandleHeadClick} from './handleHeadClick';

describe('handleHeadClick()', () => {
    it('calls `stopPropagation` on the provided event', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleHeadClick(mockEvent, params);

        assert.isTrue(mockEvent.stopPropagation.called);
    });

    it('calls `actions.open()` and focuses the native select element if closed', () => {
        const params = createMockHandlerParams();
        const openSpy = spy(params.actions, 'open');
        const focusSpy = spy(params.dom.select, 'focus');
        const mockEvent = createMockEvent();

        handleHeadClick(mockEvent, params);

        assert.isTrue(openSpy.called);
        assert.isTrue(focusSpy.called);
    });

    it('does not focus the native select element if on a mobile platform', () => {
        const params = createMockHandlerParams();
        const openSpy = spy(params.actions, 'open');
        const focusSpy = spy(params.dom.select, 'focus');
        const mockEvent = createMockEvent();

        unboundHandleHeadClick(() => true, mockEvent, params);

        assert.isTrue(openSpy.called);
        assert.isFalse(focusSpy.called);
    });

    it('calls `actions.close()` if open', () => {
        const params = createMockHandlerParams();
        const closeSpy = spy(params.actions, 'close');
        const mockEvent = createMockEvent();

        params.state.bodyStatus = BodyStatus.OPEN_ABOVE;

        handleHeadClick(mockEvent, params);

        assert.isTrue(closeSpy.called);
    });

    it('aborts if `state.isUseNativeMode` is set', () => {
        const params = createMockHandlerParams();
        const closeSpy = spy(params.actions, 'close');
        const openSpy = spy(params.actions, 'open');
        const mockEvent = createMockEvent();

        params.state.isUseNativeMode = true;

        handleHeadClick(mockEvent, params);

        assert.isFalse(openSpy.called);
        assert.isFalse(closeSpy.called);
    });
});
