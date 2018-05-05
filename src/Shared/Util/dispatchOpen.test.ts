import {assert} from 'chai';
import {spy} from 'sinon';

import createMockHandlerParams from '../../Events/Mock/createMockHandlerParams';

import dispatchOpen, {dispatchOpen as unboundDispatchOpen} from './dispatchOpen';

describe('dispatchOpen()', () => {
    it('calls `actions.open()`', () => {
        const {actions, config, dom} = createMockHandlerParams();
        const openSpy = spy(actions, 'open');

        dispatchOpen(actions, config, dom);

        assert.isTrue(openSpy.called);
    });

    it(
        'calls `actions.open()` with `isScrollable = true` when there ' +
        'are more items than the configured maxiumum',
        () => {
            const {actions, config, dom} = createMockHandlerParams();
            const openSpy = spy(actions, 'open');

            config.behavior.maxVisibleItems = 5;
            dom.item = [...Array(6)];

            dispatchOpen(actions, config, dom);

            const isScrollable = openSpy.firstCall.args[2];

            assert.isTrue(isScrollable);
        }
    );

    it(
        'overrides the configured maximum visible options if colliding',
        () => {
            const {actions, config, dom} = createMockHandlerParams();
            const openSpy = spy(actions, 'open');

            const mockDetectBodyCollision = () => ({
                maxVisibleItemsOverride: 3
            });

            config.behavior.maxVisibleItems = 6;
            dom.item = [...Array(6)];

            unboundDispatchOpen(mockDetectBodyCollision, actions, config, dom);

            const isScrollable = openSpy.firstCall.args[2];

            assert.isTrue(isScrollable);
        }
    );
});
