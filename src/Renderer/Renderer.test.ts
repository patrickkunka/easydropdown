import {assert} from 'chai';
import 'jsdom-global/register';

import ClassNames from '../Config/ClassNames';
import State      from '../State/State';
import Renderer   from './Renderer';

describe('Renderer', () => {
    it('renders the dropdown markup structure for a given state', () => {
        const state = new State();
        const classNames = new ClassNames();
        const parent = document.createElement('div');
        const select = document.createElement('select');

        parent.appendChild(select);

        const dom = Renderer.render(state, classNames, select);

        assert.isOk(dom.root);
        assert.isOk(dom.head);
        assert.isOk(dom.body);
        assert.isOk(dom.itemsList);
        assert.isNotOk(dom.groups.length);
        assert.isNotOk(dom.options.length);
        assert.equal(select, dom.select);
    });
});
