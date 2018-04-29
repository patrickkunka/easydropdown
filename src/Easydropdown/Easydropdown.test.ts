import {assert} from 'chai';
import 'jsdom-global/register';
import {spy} from 'sinon';

import Easydropdown from './Easydropdown';

const createSelect = () => {
    const parent = document.createElement('div');

    parent.innerHTML = `<select></select>`;

    return parent.firstElementChild as HTMLSelectElement;
};

describe('Easydropdown', () => {
    it('polls for mutations on the provided select element, if configured to do so', async () => {
        const select = createSelect();

        const edd = new Easydropdown(select, {
            behavior: {
                observeMutations: true
            }
        });

        // @ts-ignore
        assert.isFalse(edd.state.isDisabled);

        select.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 400));

        // @ts-ignore
        assert.isTrue(edd.state.isDisabled);

        edd.destroy();
    });

    describe('.open()', () => {
        it('programmatically opens the select', () => {
            const select = createSelect();

            select.disabled = true;

            const edd = new Easydropdown(select, {});

            const openSpy = spy(edd.actions, 'open');

            edd.open();

            assert.isTrue(openSpy.called);
        });
    });

    describe('.close()', () => {
        it('programmatically closes the select', () => {
            const select = createSelect();

            select.disabled = true;

            const edd = new Easydropdown(select, {});

            const closeSpy = spy(edd.actions, 'close');

            edd.close();

            assert.isTrue(closeSpy.called);
        });
    });
});