import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectInvalid from './handleSelectInvalid';

describe('handleSelectInvalid()', () => {
    it('calls `actions.invalidate()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const invalidateSpy = spy(params.actions, 'invalidate');

        handleSelectInvalid(mockEvent, params);

        assert.isTrue(invalidateSpy.called);
    });
});
