import {assert} from 'chai';
import {spy}    from 'sinon';

import BodyStatus              from '../../State/Constants/BodyStatus';
import createMockEvent         from '../Mock/createMockEvent';
import createMockGroups        from '../Mock/createMockGroups';
import createMockHandlerParams from '../Mock/createMockHandlerParams';

import handleSelectKeydownDown from './handleSelectKeydownDown';

describe('handleSelectKeydownDown()', () => {
    it('calls `e.preventDefault()`', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        handleSelectKeydownDown(mockEvent, params);

        assert.isTrue(mockEvent.preventDefault.called);
    });

    it('calls `actions.open()` if closed', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const openSpy = spy(params.actions, 'open');

        handleSelectKeydownDown(mockEvent, params);

        assert.isTrue(openSpy.called);
    });

    it('does not call `actions.open()` if already open', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();
        const openSpy = spy(params.actions, 'open');

        params.state.bodyStatus = BodyStatus.OPEN_ABOVE;

        handleSelectKeydownDown(mockEvent, params);

        assert.isFalse(openSpy.called);
    });

    it('increments the focused option index by 1', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.state.groups = createMockGroups();
        params.state.focusedIndex = 0;

        handleSelectKeydownDown(mockEvent, params);

        assert.equal(params.state.focusedIndex, 1);
    });

    it('skips disabled options', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.state.groups = createMockGroups();
        params.state.focusedIndex = 0;
        params.state.groups[0].options[1].isDisabled = true;

        handleSelectKeydownDown(mockEvent, params);

        assert.equal(params.state.focusedIndex, 2);
    });

    it('loops back to the start when at the last index, if configured to do so', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        params.state.groups = createMockGroups();
        params.state.focusedIndex = 2;
        params.config.behavior.loop = true;

        handleSelectKeydownDown(mockEvent, params);

        assert.equal(params.state.focusedIndex, 0);
    });

    it('jumps to the bottom if `e.metaKey` is set', () => {
        const params = createMockHandlerParams();
        const mockEvent = createMockEvent();

        mockEvent.metaKey = true;

        params.state.groups = createMockGroups();
        params.state.groups[0].options[1].isDisabled = true;
        params.state.groups = createMockGroups();
        params.state.focusedIndex = 0;

        handleSelectKeydownDown(mockEvent, params);

        assert.equal(params.state.focusedIndex, 2);
    });
});