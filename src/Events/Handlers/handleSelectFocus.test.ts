import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectFocus from './handleSelectFocus';

describe('handleSelectFocus()', () => {
    it('calls `actions.focus()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const focusSpy = spy(params.actions, 'focus');

        handleSelectFocus(mockEvent, params);

        assert.isTrue(focusSpy.called);
    });

    it('calls `actions.open()` if configured to do so', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const openSpy = spy(params.actions, 'open');

        params.config.behavior.openOnFocus = true;

        handleSelectFocus(mockEvent, params);

        assert.isTrue(openSpy.called);
    });
});
