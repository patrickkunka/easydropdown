import {assert} from 'chai';
import 'jsdom-global/register';
import {spy} from 'sinon';

import Renderer from '../Renderer/Renderer';

import Easydropdown  from './Easydropdown';

const createSelect = () => {
    const parent = document.createElement('div');

    parent.innerHTML = (`
        <select>
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
    `);

    return parent.firstElementChild as HTMLSelectElement;
};

describe('Easydropdown', () => {
    before(() => {
        window.requestAnimationFrame = setTimeout;
    });

    it('polls for mutations on the provided select element, if configured to do so', async () => {
        const select = createSelect();

        const edd = new Easydropdown(select, {
            behavior: {
                liveUpdates: true
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

    it('invokes consumer callbacks on state change', () => {
        const select = createSelect();

        const onOpenSpy = spy();
        const onCloseSpy = spy();
        const onSelectSpy = spy();

        const edd = new Easydropdown(select, {
            callbacks: {
                onOpen: onOpenSpy,
                onClose: onCloseSpy,
                onSelect: onSelectSpy
            }
        });

        edd.actions.selectOption(1);

        assert.isTrue(onSelectSpy.calledWith('B'));

        edd.open();

        assert.isTrue(onOpenSpy.called);

        edd.actions.close();

        assert.isTrue(onCloseSpy.called);
    });

    it('does not invoke consumer callbacks if not provided', () => {
        const select = createSelect();

        const edd = new Easydropdown(select, {});

        edd.actions.selectOption(1);

        edd.open();

        edd.actions.close();

        assert.isTrue(true);
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

    describe('.refresh()', () => {
        it('calls `Renderer.queryDomRefs()` with the keys `group`, `option`, and `item`', () => {
            const select = createSelect();

            const edd = new Easydropdown(select, {});

            const queryDomRefsSpy = spy(Renderer, 'queryDomRefs');

            edd.refresh();

            assert.deepEqual(queryDomRefsSpy.firstCall.args[1], ['group', 'option', 'item']);
        });

        it('empties the `dom.option`, `dom.group`, and `dom.item` arrays', () => {
            const select = createSelect();

            const edd = new Easydropdown(select, {});

            // @ts-ignore
            edd.dom.group = edd.dom.item = edd.dom.option = ['foo'];

            edd.refresh();

            // @ts-ignore
            assert.equal(edd.dom.group.length, 7);
            // @ts-ignore
            assert.equal(edd.dom.option.length, 7);
            // @ts-ignore
            assert.equal(edd.dom.item.length, 7);
        });
    });
});