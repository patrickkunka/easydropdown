import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleWindowResize from './handleWindowResize';

describe('handleWindowResize()', () => {
    it('calls `actions.close()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        handleWindowResize(mockEvent, params);

        assert.isTrue(closeSpy.called);
    });
});
