import {assert} from 'chai';
import {spy}    from 'sinon';

import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectBlur from './handleSelectBlur';

describe('handleSelectBlur()', () => {
    it('calls `actions.blur()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const blurSpy = spy(params.actions, 'blur');

        handleSelectBlur(mockEvent, params);

        assert.isTrue(blurSpy.called);
    });

    it('does not call `actions.blur()` if `state.isKeying` is set', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const blurSpy = spy(params.actions, 'blur');

        params.state.isKeying = true;

        handleSelectBlur(mockEvent, params);

        assert.isFalse(blurSpy.called);
    });

    it('calls `actions.close()` if `config.openOnFocus` is set and `state.isClickSelecting` not set', () => {
        const params = createMockHandlerParams({
            behavior: {
                openOnFocus: true
            }
        });

        params.state.isClickSelecting = false;

        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        handleSelectBlur(mockEvent, params);

        assert.isTrue(closeSpy.called);
    });

    it('does not call `actions.close()` if `config.openOnFocus` is set and `state.isClickSelecting` is set', () => {
        const params = createMockHandlerParams({
            behavior: {
                openOnFocus: true
            }
        });

        params.state.isClickSelecting = true;

        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        handleSelectBlur(mockEvent, params);

        assert.isFalse(closeSpy.called);
    });
});
