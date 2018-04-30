import {assert} from 'chai';
import {spy}    from 'sinon';

import bindEvents, {bindEvent} from './bindEvents';
import EventBinding            from './EventBinding';
import getEventsList           from './getEventsList';
import createMockHandlerParams from './Mock/createMockHandlerParams';

describe('bindEvents()', () => {
    it('returns a list of mapped `EventBinding` instances', () => {
        const params = createMockHandlerParams();
        const eventsList = getEventsList(params.dom);
        const eventBindings = bindEvents(createMockHandlerParams());

        assert.equal(eventBindings.length, eventsList.length);
    });

    describe('bindEvent()', () => {
        it('returns an unmapped instance of `EventBinding` if no target is provided', () => {
            const eventBinding = bindEvent(createMockHandlerParams(), {
                type: 'click',
                target: null
            });

            assert.instanceOf(eventBinding, EventBinding);
            assert.isNotOk(eventBinding.target);
            assert.typeOf(eventBinding.unbind, 'function');

            eventBinding.unbind();
        });

        it('attaches a handler which calls the provided handler', () => {
            const handlerSpy = spy();

            const eventBinding = bindEvent(createMockHandlerParams(), {
                type: 'click',
                target: document.createElement('div'),
                handler: handlerSpy
            });

            assert.typeOf(eventBinding.boundHandler, 'function');

            eventBinding.boundHandler(new CustomEvent('click'));

            assert.isTrue(handlerSpy.called);
        });
    });
});
