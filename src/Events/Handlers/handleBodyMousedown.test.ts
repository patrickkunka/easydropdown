import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleBodyMousedown from './handleBodyMousedown';

describe('handleBodyMousedown()', () => {
    it('calls `stopPropagation` on the provided event', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleBodyMousedown(mockEvent, params);

        assert.isTrue(mockEvent.stopPropagation.called);
    });

    it('calls `actions.startClickSelecting()` if the event target is an option', () => {
        const params = createMockHandlerParams();
        const startClickSelectingSpy = spy(params.actions, 'startClickSelecting');
        const option = document.createElement('div');
        const mockEvent = createMockEvent(option);

        option.setAttribute('data-ref', 'option');

        params.dom.option.push(option);

        handleBodyMousedown(mockEvent, params);

        assert.isTrue(startClickSelectingSpy.called);
    });
});
