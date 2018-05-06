import * as chai from 'chai';

import BodyStatus from './Constants/BodyStatus';
import State from './State';

const {assert} = chai;

const createMockState = () => ({
    groups: [
        {options: [{}, {}]},
        {options: [{
            value: 'foo'
        }, {}]}
    ]
});

describe('State', () => {
    describe('get totalGroups()', () => {
        it('returns the total number of groups', () => {
            const state = new State(createMockState());

            assert.equal(state.totalGroups, 2);
        });
    });

    describe('get totalOptions()', () => {
        it('returns the total number of options', () => {
            const state = new State(createMockState());

            assert.equal(state.totalOptions, 4);
        });
    });

    describe('get label()', () => {
        it('returns an empty string if no selected option', () => {
            const state = new State(createMockState());

            assert.equal(state.label, '');
        });
    });

    describe('get value()', () => {
        it('returns an empty string if no selected index', () => {
            const state = new State(createMockState());

            assert.equal(state.value, '');
        });

        it('returns a value based on the selected index for multiple groups', () => {
            const mockState = Object.assign(createMockState(), {
                selectedIndex: 2
            });

            const state = new State(mockState);

            assert.equal(state.value, 'foo');
        });

        it('returns a value based on the selected index for a single group', () => {
            const mockState = Object.assign(createMockState(), {
                selectedIndex: 0
            });

            mockState.groups.splice(0, 1);

            const state = new State(mockState);

            assert.equal(state.value, 'foo');
        });
    });

    describe('get isGrouped()', () => {
        it('returns `false` if no groups have a label', () => {
            const state = new State(createMockState());

            assert.isFalse(state.isGrouped);
        });

        it('returns `true` if at least one group has a label', () => {
            const mockState = createMockState();

            (mockState.groups[0] as any).label = 'foo';

            const state = new State(mockState);

            assert.isTrue(state.isGrouped);
        });
    });

    describe('get humanReadableValue()', () => {
        it('returns `state.placeholder` if a placeholder exists', () => {
            const state = new State(createMockState());

            state.placeholder = 'foo';
            // @ts-ignore
            state.config.behavior.showPlaceholderWhenOpen = true;
            state.selectedIndex = 2;
            state.bodyStatus = BodyStatus.OPEN_ABOVE;

            assert.equal(state.humanReadableValue, state.placeholder);
        });
    });

    describe('getOptionIndexFromValue', () => {
        it('returns `-1` by default', () => {
            const state = new State();

            assert.equal(state.getOptionIndexFromValue('foo'), -1);
        });
    });
});