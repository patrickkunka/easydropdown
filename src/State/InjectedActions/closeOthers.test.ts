import {assert} from 'chai';
import {spy}    from 'sinon';

import Easydropdown from '../../Easydropdown/Easydropdown';

import closeOthers from './closeOthers';

describe('closeOthers()', () => {
    it('calls `close` on all instance in the provided cache, expect the caller instance', () => {
        const parent = document.createElement('div');
        const select = document.createElement('select');

        parent.appendChild(select);

        const thisInstance = new Easydropdown(select, {});
        const otherInstance = new Easydropdown(select, {});

        const cache = [
            thisInstance,
            otherInstance
        ];

        const thisCloseSpy = spy(thisInstance.actions, 'close');
        const otherCloseSpy = spy(otherInstance.actions, 'close');

        closeOthers(thisInstance, cache);

        assert.isTrue(otherCloseSpy.called);
        assert.isFalse(thisCloseSpy.called);
    });
});