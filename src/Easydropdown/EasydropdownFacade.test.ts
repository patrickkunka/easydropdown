import {assert} from 'chai';
import 'jsdom-global/register';

import factory from './factory';

describe('EasydropdownFacade', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('exposes a `value` accessor property', () => {
        const parent = document.createElement('div');

        parent.innerHTML = (`
            <select>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
        `);

        const select = parent.firstElementChild as HTMLSelectElement;
        const facade = factory(select);

        assert.equal(facade.value, 'A');

        facade.value = 'B';

        assert.equal(select.value, 'B');

        // @ts-ignore intentionally cuasing error
        assert.throws(() => facade.value = 5, TypeError);
    });
});