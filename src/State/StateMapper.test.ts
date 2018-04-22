import 'jsdom-global/register'
import {assert} from 'chai';

import createDomElementFromHtml from '../Shared/Util/createDomElementFromHtml';
import StateMapper              from './StateMapper';

describe('StateMapper', function() {
    it('maps a select element\'s attributes', () => {
        const select = createDomElementFromHtml(`<select name="foo" disabled autofocus/>`);
        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.name, 'foo');
        assert.isTrue(state.isDisabled);
        assert.isTrue(state.autofocus);
    });

    it('maps a select element\'s options', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <option value="bar">Bar</option>
                <option value="baz">Baz</option>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.totalGroups, 1);
        assert.equal(state.totalOptions, 2);
        assert.equal(state.selectedIndex, 0);
        assert.equal(state.value, 'bar');
        assert.isFalse(state.isGrouped);
        assert.isFalse(state.isDisabled);

        assert.deepEqual(state.groups[0].options[0], {
            isDisabled: false,
            label: 'Bar',
            value: 'bar'
        });
    });

    it('maps a selected option', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <option value="bar">Bar</option>
                <option value="baz" selected>Baz</option>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.value, 'baz');
    });

    it('maps an option\'s text content to its `value` if no `value` is provided', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <option value="bar">Bar</option>
                <option selected>Baz</option>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.value, 'Baz');
    });

    it('maps a disabled option', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <option value="bar">Bar</option>
                <option value="baz" disabled>Baz</option>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.deepEqual(state.groups[0].options[1], {
            isDisabled: true,
            label: 'Baz',
            value: 'baz'
        });
    });

    it('maps a first option with a `data-label` attribute preset to the global label', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <option data-label>Select</option>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.label, 'Select');
        assert.equal(state.totalGroups, 0);
        assert.equal(state.totalOptions, 0);
    });

    it('maps `optgroup` elements to `groups`', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <optgroup label="bar">
                    <option>Baz</option>
                </optgroup>
                <optgroup label="qux">
                    <option selected>Quux</option>
                </optgroup>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.label, '');
        assert.equal(state.totalGroups, 2);
        assert.equal(state.totalOptions, 2);
        assert.equal(state.selectedIndex, 1);
    });

    it('maps a mixture of `optgroup` and `option`', () => {
        const select = createDomElementFromHtml(`
            <select name="foo">
                <optgroup label="bar">
                    <option>Baz</option>
                </optgroup>
                <option>Corge</option>
                <option>Uier</option>
                <optgroup label="qux">
                    <option selected>Quux</option>
                </optgroup>
            </select>
        `);

        const state = StateMapper.mapFromSelect(select as HTMLSelectElement);

        assert.equal(state.label, '');
        assert.equal(state.totalGroups, 3);
        assert.equal(state.totalOptions, 4);
        assert.equal(state.selectedIndex, 3);
    });
});