import 'jsdom-global/register';

import {assert} from 'chai';
import merge    from 'helpful-merge';
import {spy}    from 'sinon';

import ClassNames   from '../Config/ClassNames';
import Config       from '../Config/Config';
import IConfig      from '../Config/Interfaces/IConfig';
import BodyStatus   from '../State/Constants/BodyStatus';
import ScrollStatus from '../State/Constants/ScrollStatus';
import State        from '../State/State';
import StateMapper  from '../State/StateMapper';

import Dom      from './Dom';
import Renderer from './Renderer';

const createSelect = (): HTMLSelectElement => {
    const parent = document.createElement('div');

    parent.innerHTML = (`
        <select name="test">
            <option>A</option>
            <option>B</option>
            <option>C</option>
        </select>
    `);

    return parent.firstElementChild as HTMLSelectElement;
};

const createState = (select: HTMLSelectElement, options: IConfig = {}): State => {
    const config = merge(new Config(), options, true);

    return StateMapper.mapFromSelect(select, config);
};

interface ITestContext {
    classNames: ClassNames;
    renderer: Renderer;
}

describe('Renderer', function(): void {
    // @ts-ignore
    const self: ITestContext = this;

    before(() => {
        self.classNames = new ClassNames();
        self.renderer = new Renderer(self.classNames);
    });

    it('renders the dropdown markup structure for a given state', () => {
        const select = createSelect();
        const dom = self.renderer.render(new State(), select);

        assert.isOk(dom.root);
        assert.isOk(dom.head);
        assert.isOk(dom.body);
        assert.isOk(dom.itemsList);
        assert.isNotOk(dom.group.length);
        assert.isNotOk(dom.option.length);
        assert.equal(select, dom.select);

        assert.isTrue(dom.root.classList.contains(self.classNames.root));
    });

    it('can be called multiple times without malforming the returned object', () => {
        const select = createSelect();

        let dom = self.renderer.render(new State(), select);
        dom = self.renderer.render(new State(), select);

        assert.isTrue(dom.root.contains(dom.select));
    });

    it('renders the appropriate markup for `state.isDisabled`', () => {
        const select = createSelect();
        const state = createState(select);

        state.isDisabled = true;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootDisabled));
    });

    it('renders the appropriate markup for `state.isInvalid`', () => {
        const select = createSelect();
        const state = createState(select);

        state.isInvalid = true;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootInvalid));
    });

    it('renders the appropriate markup for a `state.bodyStatus` of `OPEN_ABOVE`', () => {
        const select = createSelect();
        const state = createState(select);

        state.bodyStatus = BodyStatus.OPEN_ABOVE;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootOpen));
        assert.isTrue(dom.root.classList.contains(self.classNames.rootOpenAbove));
    });

    it('renders the appropriate markup for a `state.bodyStatus` of `OPEN_BELOW`', () => {
        const select = createSelect();
        const state = createState(select);

        state.bodyStatus = BodyStatus.OPEN_BELOW;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootOpen));
        assert.isTrue(dom.root.classList.contains(self.classNames.rootOpenBelow));
    });

    it('renders the appropriate markup for `state.isFocused`', () => {
        const select = createSelect();
        const state = createState(select);

        state.isFocused = true;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootFocused));
    });

    it('renders the appropriate markup for `state.isRequired`', () => {
        const select = createSelect();
        const state = createState(select);

        state.isRequired = true;

        const dom = self.renderer.render(state, select);

        assert.equal(dom.root.getAttribute('aria-required'), 'true');
    });

    it('renders the appropriate markup for a state with a selected value', () => {
        const select = createSelect();
        const state = createState(select);

        state.selectedIndex = 2;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootHasValue));
    });

    it('renders the appropriate markup for "use native mode"', () => {
        const select = createSelect();
        const state = createState(select);

        state.isUseNativeMode = true;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.root.classList.contains(self.classNames.rootNative));
        assert.isNotOk(dom.body);
    });

    it('renders the selected in the `value` element', () => {
        const select = createSelect();
        const state = createState(select);
        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.value.textContent.includes('A'));
    });

    it(
        'renders the placeholder value in the `value` element, when ' +
        'open and when configured to do so',
        () => {
            const select = createSelect();
            const state = createState(select, {
                behavior: {
                    showPlaceholderWhenOpen: true
                }
            });

            state.placeholder = 'foo';
            state.bodyStatus = BodyStatus.OPEN_ABOVE;
            state.selectedIndex = -1;

            const dom = self.renderer.render(state, select);

            assert.isTrue(dom.value.textContent.includes('foo'));
            assert.equal(dom.value.getAttribute('aria-placeholder'), state.placeholder);
        }
    );

    it('renders the appropriate markup for a `state.scrollStatus` of `AT_TOP`', () => {
        const select = createSelect();
        const state = createState(select);
        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.body.classList.contains(self.classNames.bodyAtTop));
    });

    it('renders the appropriate markup for a `state.scrollStatus` of `AT_BOTTOM`', () => {
        const select = createSelect();
        const state = createState(select);

        state.scrollStatus = ScrollStatus.AT_BOTTOM;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.body.classList.contains(self.classNames.bodyAtBottom));
    });

    it('renders the appropriate markup for `state.isScrollable`', () => {
        const select = createSelect();
        const state = createState(select);

        state.isScrollable = true;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.body.classList.contains(self.classNames.bodyScrollable));
    });

    it('renders a `max-height` style attribute when the body is open', () => {
        const select = createSelect();
        const state = createState(select);

        state.bodyStatus = BodyStatus.OPEN_BELOW;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.itemsList.classList.contains(self.classNames.itemsList));
        assert.isTrue(dom.itemsList.hasAttribute('style'));
        assert.isTrue(dom.itemsList.getAttribute('style').includes('max-height'));
    });

    it('renders a single group by default', () => {
        const select = createSelect();
        const state = createState(select);

        const dom = self.renderer.render(state, select);

        assert.equal(dom.group.length, 1);

        assert.isTrue(dom.group[0].classList.contains(self.classNames.group));
    });

    it('renders a single group by default', () => {
        const select = createSelect();
        const state = createState(select);

        const dom = self.renderer.render(state, select);

        assert.equal(dom.group.length, 1);
    });

    it('renders the appropriate markup for `group.isDisabled`', () => {
        const select = createSelect();
        const state = createState(select);

        state.groups[0].isDisabled = true;

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.group[0].classList.contains(self.classNames.groupDisabled));
    });

    it('renders the appropriate markup for `group.hasLabel`', () => {
        const select = createSelect();
        const state = createState(select);

        state.groups[0].label = 'foo';

        const dom = self.renderer.render(state, select);

        assert.isTrue(dom.group[0].classList.contains(self.classNames.groupHasLabel));
    });

    it('renders an option element for each option nested in a group', () => {
        const select = createSelect();
        const state = createState(select);

        const dom = self.renderer.render(state, select);

        assert.equal(dom.option.length, 3);
        assert.isTrue(dom.option[0].classList.contains(self.classNames.option));
    });

    it('renders the appropriate markup for a selected option', () => {
        const select = createSelect();
        const state = createState(select);

        state.selectedIndex = 0;

        const dom = self.renderer.render(state, select);

        const firstOption = dom.option[0];

        assert.isTrue(firstOption.classList.contains(self.classNames.optionSelected));
    });

    it('renders the appropriate markup for a focused option', () => {
        const select = createSelect();
        const state = createState(select);

        state.focusedIndex = 0;

        const dom = self.renderer.render(state, select);

        const firstOption = dom.option[0];

        assert.isTrue(firstOption.classList.contains(self.classNames.optionFocused));
    });

    it('renders the appropriate markup for `option.isDisabled`', () => {
        const select = createSelect();
        const state = createState(select);

        state.groups[0].options[0].isDisabled = true;

        const dom = self.renderer.render(state, select);

        const firstOption = dom.option[0];

        assert.isTrue(firstOption.classList.contains(self.classNames.optionDisabled));
    });

    it('renders an option\'s label', () => {
        const select = createSelect();
        const state = createState(select);
        const dom = self.renderer.render(state, select);
        const firstOption = dom.option[0];

        assert.isTrue(firstOption.textContent.includes('A'));
    });

    describe('.injectSelect()', () => {
        it('throws a `TypeError` if the provided select is not attached to a parent', () => {
            const select = document.createElement('select');

            // @ts-ignore
            assert.throws(() => self.renderer.injectSelect(select), Error);
        });
    });

    describe('.syncSelectWithValue()', () => {
        it('sets the `value` of the provided select, and emits a change event', () => {
            const select = createSelect();
            const changeSpy = spy();

            select.addEventListener('change', changeSpy);

            self.renderer.dom.select = select;

            // @ts-ignore
            self.renderer.syncSelectWithValue('C');

            assert.isTrue(changeSpy.called);
            assert.equal(select.value, 'C');
        });

        it('emits no change event, if the value is unchanged', () => {
            const select = createSelect();
            const changeSpy = spy();

            select.addEventListener('change', changeSpy);

            self.renderer.dom.select = select;

            select.value = 'C';

            // @ts-ignore
            self.renderer.syncSelectWithValue('C');

            assert.isFalse(changeSpy.called);
        });
    });

    describe('Renderer.queryDomRefs()', () => {
        it('silently handles values in the provided `Dom` instance that are not null or empty arrays', () => {
            const dom = new Dom();
            const arrow = document.createElement('div');

            arrow.setAttribute('data-ref', 'arrow');

            const root = document.createElement('div');

            root.appendChild(arrow);

            dom.root = root;
            dom.arrow = undefined;

            Renderer.queryDomRefs(dom);

            assert.isOk(true);
        });
    });
});
