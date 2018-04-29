import {assert} from 'chai';
import 'jsdom-global/register';

import ClassNames from '../Config/ClassNames';
import BodyStatus from '../State/Constants/BodyStatus';
import State      from '../State/State';
import Renderer   from './Renderer';

const createSelect = (): HTMLSelectElement => {
    const parent = document.createElement('div');
    const select = document.createElement('select');

    parent.appendChild(select);

    return select;
};

interface ITestContext {
    classNames: ClassNames;
    renderer: Renderer;
    createSelect: () => HTMLSelectElement;
}

describe('Renderer', function(): void {
    // @ts-ignore
    const self: ITestContext = this;

    before(() => {
        self.classNames = new ClassNames();
        self.renderer = new Renderer(self.classNames);
        self.createSelect = createSelect;
    });

    it('renders the dropdown markup structure for a given state', () => {
        const select = self.createSelect();
        const dom = self.renderer.render(new State(), select);

        assert.isOk(dom.root);
        assert.isOk(dom.head);
        assert.isOk(dom.body);
        assert.isOk(dom.itemsList);
        assert.isNotOk(dom.group.length);
        assert.isNotOk(dom.option.length);
        assert.equal(select, dom.select);
    });

    it('renders a "disabled" class for a disabled state', () => {
        const select = self.createSelect();
        const state = new State();

        state.isDisabled = true;

        const dom = self.renderer.render(state, select);

        assert.isOk(dom.root.classList.contains(self.classNames.rootDisabled));
    });

    it('renders an "invalid" class for an invalid state', () => {
        const select = self.createSelect();
        const state = new State();

        state.isInvalid = true;

        const dom = self.renderer.render(state, select);

        assert.isOk(dom.root.classList.contains(self.classNames.rootInvalid));
    });

    it('renders an "open" class for an open above state', () => {
        const select = self.createSelect();
        const state = new State();

        state.bodyStatus = BodyStatus.OPEN_ABOVE;

        const dom = self.renderer.render(state, select);

        assert.isOk(dom.root.classList.contains(self.classNames.rootOpen));
        assert.isOk(dom.root.classList.contains(self.classNames.rootOpenAbove));
    });

    it('renders an "open" class for an open below state', () => {
        const select = self.createSelect();
        const state = new State();

        state.bodyStatus = BodyStatus.OPEN_BELOW;

        const dom = self.renderer.render(state, select);

        assert.isOk(dom.root.classList.contains(self.classNames.rootOpen));
        assert.isOk(dom.root.classList.contains(self.classNames.rootOpenBelow));
    });

    it('renders a "focussed" class for a focussed state', () => {
        const select = self.createSelect();
        const state = new State();

        state.isFocused = true;

        const dom = self.renderer.render(state, select);

        assert.isOk(dom.root.classList.contains(self.classNames.rootFocused));
    });

    it('renders a "hasValue" class for a has value state', () => {
        const select = self.createSelect();
        const state = new State();

        state.selectedIndex = 3;

        // TODO: add some options

        const dom = self.renderer.render(state, select);

        assert.isOk(dom.root.classList.contains(self.classNames.rootFocused));
    });
});
