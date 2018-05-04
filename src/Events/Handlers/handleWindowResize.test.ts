import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleWindowResize from './handleWindowResize';

describe('handleWindowResize()', () => {
    it('calls `setGeometry()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const setOptionHeightSpy = spy(params.actions, 'setOptionHeight');

        handleWindowResize(mockEvent, params);

        assert.isTrue(setOptionHeightSpy.called);
    });
});
