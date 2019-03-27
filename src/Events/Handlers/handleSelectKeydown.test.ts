import {assert} from 'chai';
import {spy}    from 'sinon';

import BodyStatus              from '../../State/Constants/BodyStatus';
import * as KeyCodes           from '../Constants/KeyCodes';
import createMockEvent         from '../Mock/createMockEvent';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectKeydown from './handleSelectKeydown';

describe('handleSelectKeydown()', () => {
    it('calls `actions.close()` if the escape key is pressed', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        mockEvent.keyCode = KeyCodes.ESC;

        handleSelectKeydown(mockEvent, params);

        assert.isTrue(closeSpy.called);
    });

    it('aborts if `state.isDisabled` is set', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        mockEvent.keyCode = KeyCodes.ESC;
        params.state.isDisabled = true;

        handleSelectKeydown(mockEvent, params);

        assert.isFalse(closeSpy.called);
    });

    it('aborts if `state.isUseNativeMode` is set', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const closeSpy = spy(params.actions, 'close');

        mockEvent.keyCode = KeyCodes.ESC;
        params.state.isUseNativeMode = true;

        handleSelectKeydown(mockEvent, params);

        assert.isFalse(closeSpy.called);
    });

    it('calls `actions.open()` if the enter or space key is pressed', () => {
        [KeyCodes.ENTER, KeyCodes.SPACE]
            .forEach(keyCode => {
                const mockEvent = createMockEvent();
                const params = createMockHandlerParams();
                const openSpy = spy(params.actions, 'open');

                mockEvent.keyCode = keyCode;

                handleSelectKeydown(mockEvent, params);

                assert.isTrue(openSpy.called);
            });
    });

    it('calls `actions.selectOption()` if open and the enter or space key is pressed', () => {
        [KeyCodes.ENTER, KeyCodes.SPACE]
            .forEach(keyCode => {
                const mockEvent = createMockEvent();
                const params = createMockHandlerParams();
                const selectOptionSpy = spy(params.actions, 'selectOption');

                params.state.bodyStatus = BodyStatus.OPEN_ABOVE;

                mockEvent.keyCode = keyCode;

                handleSelectKeydown(mockEvent, params);

                assert.isTrue(selectOptionSpy.called);
            });
    });

    it('calls `actions.selectOption()` with `close: false` if configured not to `closeOnSelect`', () => {
        const mockEvent = createMockEvent();

        const params = createMockHandlerParams({
            behavior: {
                closeOnSelect: false
            }
        });

        const selectOptionSpy = spy(params.actions, 'selectOption');

        params.state.bodyStatus = BodyStatus.OPEN_ABOVE;

        mockEvent.keyCode = KeyCodes.ENTER;

        handleSelectKeydown(mockEvent, params);

        assert.isTrue(selectOptionSpy.calledWith(params.state.focusedIndex, false));
    });

    it('does not call `actions.selectOption()` if when the space key is pressed if searching', () => {
        const mockEvent = createMockEvent();
        const params = createMockHandlerParams();
        const selectOptionSpy = spy(params.actions, 'selectOption');

        params.state.bodyStatus = BodyStatus.OPEN_ABOVE;
        params.state.isSearching = true;

        mockEvent.keyCode = KeyCodes.SPACE;

        handleSelectKeydown(mockEvent, params);

        assert.isFalse(selectOptionSpy.called);
    });

    it('calls `actions.focusOption()` if the up or down key is pressed', () => {
        [KeyCodes.UP, KeyCodes.DOWN]
            .forEach(keyCode => {
                const params = createMockHandlerParams();
                const mockEvent = createMockEvent();
                const focusOptionSpy = spy(params.actions, 'focusOption');

                mockEvent.keyCode = keyCode;

                handleSelectKeydown(mockEvent, params);

                assert.isTrue(focusOptionSpy.called);
            });
    });
});