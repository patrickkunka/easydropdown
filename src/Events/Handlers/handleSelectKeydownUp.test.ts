import {assert} from 'chai';
import {spy}    from 'sinon';

import BodyStatus              from '../../State/Constants/BodyStatus';
import createMockEvent         from '../Mock/createMockEvent';
import createMockGroups        from '../Mock/createMockGroups';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectKeydownUp from './handleSelectKeydownUp';

describe('handleSelectKeydownUp()', () => {
    it('calls `e.preventDefault()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleSelectKeydownUp(mockEvent, params);

        assert.isTrue(mockEvent.preventDefault.called);
    });

    it('calls `actions.open()` if closed', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const openSpy = spy(params.actions, 'open');

        handleSelectKeydownUp(mockEvent, params);

        assert.isTrue(openSpy.called);
    });

    it('does not call `actions.open()` if already open', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const openSpy = spy(params.actions, 'open');

        params.state.bodyStatus = BodyStatus.OPEN_ABOVE;

        handleSelectKeydownUp(mockEvent, params);

        assert.isFalse(openSpy.called);
    });

    it('decrements the focused option index by 1', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.state.groups = createMockGroups();
        params.state.focusedIndex = 2;

        handleSelectKeydownUp(mockEvent, params);

        assert.equal(params.state.focusedIndex, 1);
    });

    it('skips disabled options', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.state.groups = createMockGroups();
        params.state.focusedIndex = 2;
        params.state.groups[0].options[1].isDisabled = true;

        handleSelectKeydownUp(mockEvent, params);

        assert.equal(params.state.focusedIndex, 0);
    });

    it('loops back to the end when at `0`, if configured to do so', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.state.groups = createMockGroups();
        params.state.focusedIndex = 0;
        params.config.behavior.loop = true;

        handleSelectKeydownUp(mockEvent, params);

        assert.equal(params.state.focusedIndex, 2);
    });

    it('jumps to top if `e.metaKey` is set', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        mockEvent.metaKey = true;

        params.state.groups = createMockGroups();
        params.state.groups[0].options[1].isDisabled = true;
        params.state.groups = createMockGroups();
        params.state.focusedIndex = 2;

        handleSelectKeydownUp(mockEvent, params);

        assert.equal(params.state.focusedIndex, 0);
    });
});