import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleWindowResize, {handleWindowResize as unboundHandleWindowResize} from './handleWindowResize';

describe('handleWindowResize()', () => {
    it('calls `actions.close()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        handleWindowResize(mockEvent, params);

        assert.isTrue(closeSpy.called);
    });

    it('does not call `actions.close()` if a mobile platform is detected', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        unboundHandleWindowResize(() => true, mockEvent, params);

        assert.isFalse(closeSpy.called);
    });
});
