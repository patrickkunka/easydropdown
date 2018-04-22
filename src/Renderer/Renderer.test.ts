import 'jsdom-global/register'
import {assert} from 'chai';

import Renderer   from './Renderer';
import ClassNames from '../Config/ClassNames';
import State      from '../State/State';

describe('Renderer', function() {
    it('renders the dropdown markup structure for a give state', () => {
        const state = new State();
        const classNames = new ClassNames();

        const dom = Renderer.render(state, classNames);

        assert.isOk(dom.root);
        assert.isOk(dom.head);
        assert.isOk(dom.body);
    });
});
