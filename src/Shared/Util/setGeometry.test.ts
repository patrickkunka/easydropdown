import {assert} from 'chai';
import merge    from 'helpful-merge';
import {
    SinonSpy,
    spy
} from 'sinon';

import Dom             from '../../Renderer/Dom';
import resolveActions  from '../../State/resolveActions';
import State           from '../../State/State';
import {createMockDom} from './detectIsScrollable.test';
import setGeometry     from './setGeometry';

const createMockState = (initialState = {}) => {
    const state = merge(new State(), initialState);

    return state;
};

const createMockActions = (state: State) => {
    const actions = resolveActions(state);

    spy(actions, 'makeScrollable');
    spy(actions, 'makeUnscrollable');
    spy(actions, 'setOptionHeight');

    return actions;
};

describe('setGeometry()', () => {
    it('calls `actions.makeScrollable()` if is scrollable', () => {
        const state = createMockState();
        const actions = createMockActions(state);
        const dom = createMockDom(101, 100);

        setGeometry(state, actions, dom);

        assert.isTrue((actions.makeScrollable as SinonSpy).called);
    });

    it('calls `actions.makeUnscrollable()` if not scrollable', () => {
        const state = createMockState({
            isScrollable: true
        });

        const actions = createMockActions(state);
        const dom = createMockDom(100, 101);

        setGeometry(state, actions, dom);

        assert.isTrue((actions.makeUnscrollable as SinonSpy).called);
    });

    it('calls `actions.setOptionHeight()` with `dom.optionHeight`', () => {
        const state = createMockState();
        const actions = createMockActions(state);
        const dom = createMockDom(100, 101);

        setGeometry(state, actions, dom);

        assert.isTrue((actions.setOptionHeight as SinonSpy).calledWith(
            dom.optionHeight
        ));
    });

    it('calls no actions if `dom.body` is unset', () => {
        const state = createMockState();
        const actions = createMockActions(state);
        const dom = new Dom();

        setGeometry(state, actions, dom);

        assert.isFalse((actions.setOptionHeight as SinonSpy).called);
        assert.isFalse((actions.makeScrollable as SinonSpy).called);
        assert.isFalse((actions.makeUnscrollable as SinonSpy).called);
    });
});
