import {assert} from 'chai';
import {spy}    from 'sinon';

import BodyStatus              from '../../State/Constants/BodyStatus';
import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleWindowClick from './handleWindowClick';

describe('handleWindowClick()', () => {
    it('calls `actions.close()` and blurs the native select if open', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');
        const blurSpy  = spy(params.dom.select, 'blur');

        params.state.bodyStatus = BodyStatus.OPEN_ABOVE;

        handleWindowClick(mockEvent, params);

        assert.isTrue(closeSpy.called);
        assert.isTrue(blurSpy.called);
    });

    it('aborts if closed', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');
        const blurSpy  = spy(params.dom.select, 'blur');

        handleWindowClick(mockEvent, params);

        assert.isFalse(closeSpy.called);
        assert.isFalse(blurSpy.called);
    });
});
