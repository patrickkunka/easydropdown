import {assert} from 'chai';
import {spy} from 'sinon';

import State from '../../State/State';

import pollForSelectMutation from './pollForSelectMutation';

describe('pollForSelectMutation()', () => {
    it('calls the provided function when a mutation is detected', async () => {
        const select = document.createElement('select');
        const handleMutationSpy = spy();

        pollForSelectMutation(select, new State(), handleMutationSpy);

        select.classList.add('foo');

        await new Promise(resolver => setTimeout(resolver, 300));

        assert.isTrue(handleMutationSpy.called);
    });

    it('does not calls the provided function when no mutation is detected', async () => {
        const select = document.createElement('select');
        const handleMutationSpy = spy();

        pollForSelectMutation(select, new State(), handleMutationSpy);

        await new Promise(resolver => setTimeout(resolver, 300));

        assert.isFalse(handleMutationSpy.called);
    });
});
