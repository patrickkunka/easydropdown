import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleBodyClick from './handleBodyClick';

describe('handleBodyClick()', () => {
    it('calls `stopPropagation()` on the provided event', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleBodyClick(mockEvent, params);

        assert.isTrue(mockEvent.stopPropagation.called);
    });

    it('calls `actions.selectOption()` if the event target is an option', () => {
        const params = createMockHandlerParams();
        const selectOptionSpy = spy(params.actions, 'selectOption');
        const option = document.createElement('div');
        const mockEvent = createMockEvent(option);

        option.setAttribute('data-ref', 'option');

        params.dom.option.push(option);

        handleBodyClick(mockEvent, params);

        assert.isTrue(selectOptionSpy.calledWith(0));
    });

    it('calls `actions.selectOption()` with `close: false` if configured not to `closeOnSelect`', () => {
        const params = createMockHandlerParams({
            behavior: {
                closeOnSelect: false
            }
        });

        const selectOptionSpy = spy(params.actions, 'selectOption');
        const option = document.createElement('div');
        const mockEvent = createMockEvent(option);

        option.setAttribute('data-ref', 'option');

        params.dom.option.push(option);

        handleBodyClick(mockEvent, params);

        assert.isTrue(selectOptionSpy.calledWith(0, false));
    });
});
