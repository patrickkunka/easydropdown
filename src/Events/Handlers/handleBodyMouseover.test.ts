import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleBodyMouseover from './handleBodyMouseover';

describe('handleBodyMouseover()', () => {
    it('calls `stopPropagation` on the provided event', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleBodyMouseover(mockEvent, params);

        assert.isTrue(mockEvent.stopPropagation.called);
    });

    it('calls `actions.focusOption()` if the event target is an option', () => {
        const params = createMockHandlerParams();
        const focusOptionSpy = spy(params.actions, 'focusOption');
        const option = document.createElement('div');
        const mockEvent = createMockEvent(option);

        option.setAttribute('data-ref', 'option');

        params.dom.option.push(option);

        handleBodyMouseover(mockEvent, params);

        assert.isTrue(focusOptionSpy.calledWith(0));
    });
});
