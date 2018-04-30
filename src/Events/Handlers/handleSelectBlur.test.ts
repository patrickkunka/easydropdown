import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';
import handleSelectBlur        from './handleSelectBlur';

describe('handleSelectBlur()', () => {
    it('calls `actions.blur()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const blurSpy = spy(params.actions, 'blur');

        handleSelectBlur(mockEvent, params);

        assert.isTrue(blurSpy.called);
    });
});
