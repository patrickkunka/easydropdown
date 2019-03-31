import * as chai from 'chai';
import 'jsdom-global/register';
import {spy} from 'sinon';

chai.config.truncateThreshold = 0;

import CollisionType  from '../Shared/Util/Constants/CollisionType';

import BodyStatus     from './Constants/BodyStatus';
import ScrollStatus   from './Constants/ScrollStatus';
import IActions       from './Interfaces/IActions';
import resolveActions from './resolveActions';
import State          from './State';

const {assert} = chai;

const createMockState = () => new State({
    groups: [
        {
            options: [
                {
                    value: 'A'
                },
                {
                    value: 'B'
                },
                {
                    value: 'C'
                }
            ]
        }
    ]
});

interface ITestContext {
    state: State;
    actions: IActions;
}

describe('resolveActions', function(): void {
    // @ts-ignore
    const self: ITestContext = this;

    beforeEach(() => {
        self.state = createMockState();
        self.actions = resolveActions(self.state);

        self.actions.closeOthers = () => void 0;
        self.actions.scrollToView = () => void 0;
    });

    describe('.focus()', () => {
        it('sets `state.isFocused`', () => {
            self.actions.focus();

            assert.isTrue(self.state.isFocused);
        });
    });

    describe('.blur()', () => {
        it('unsets `state.isFocused`', () => {
            self.actions.focus();

            assert.isTrue(self.state.isFocused);

            self.actions.blur();

            assert.isFalse(self.state.isFocused);
        });
    });

    describe('.invalidate()', () => {
        it('sets `state.isInvalid`', () => {
            self.actions.invalidate();

            assert.isTrue(self.state.isInvalid);
        });
    });

    describe('.validate()', () => {
        it('unsets `state.isInvalid`', () => {
            self.actions.invalidate();

            assert.isTrue(self.state.isInvalid);

            self.actions.validate();

            assert.isFalse(self.state.isInvalid);
        });
    });

    describe('.topOut()', () => {
        it('sets the `state.scrollStatus` to `AT_TOP`', () => {
            self.state.scrollStatus = null;

            self.actions.topOut();

            assert.isTrue(self.state.isAtTop);
        });
    });

    describe('.bottomOut()', () => {
        it('sets the `state.scrollStatus` to `AT_BOTTOM`', () => {
            self.state.scrollStatus = null;

            self.actions.bottomOut();

            assert.isTrue(self.state.isAtBottom);
        });
    });

    describe('.scroll()', () => {
        it('sets the `state.scrollStatus` to `SCROLLED`', () => {
            self.state.scrollStatus = null;

            self.actions.scroll();

            assert.equal(self.state.scrollStatus, ScrollStatus.SCROLLED);
        });
    });

    describe('.makeScrollabel()', () => {
        it('sets `state.isScrollable`', () => {
            self.actions.makeScrollable();

            assert.isTrue(self.state.isScrollable);
        });
    });

    describe('.makeUnscrollable()', () => {
        it('unsets `state.isScrollable`', () => {
            self.actions.makeScrollable();

            assert.isTrue(self.state.isScrollable);

            self.actions.makeUnscrollable();

            assert.isFalse(self.state.isScrollable);
        });
    });

    describe('.open()', () => {
        it('does nothing if disabled', () => {
            self.state.isDisabled = true;

            self.actions.open(0, CollisionType.NONE, false);

            assert.isTrue(self.state.isClosed);
        });

        it('opens "below" if a collision type of `TOP` is provided', () => {
            self.actions.open(0, CollisionType.TOP, false);

            assert.isTrue(self.state.isOpenBelow);
        });

        it('opens "below" if a collision type of `NONE` is provided', () => {
            self.actions.open(0, CollisionType.NONE, false);

            assert.isTrue(self.state.isOpenBelow);
        });

        it('opens "above" if a collision type of `BOTTOM` is provided', () => {
            self.actions.open(0, CollisionType.BOTTOM, false);

            assert.isTrue(self.state.isOpenAbove);
        });

        it('set `state.isScrollable()` based on the value of the last parameter', () => {
            assert.isFalse(self.state.isScrollable);

            self.actions.open(0, CollisionType.NONE, true);

            assert.isTrue(self.state.isScrollable);
        });

        it('calls `actions.scrollToView()`', () => {
            const scrollToViewSpy = spy(self.actions, 'scrollToView');

            self.actions.open(0, CollisionType.NONE, false);

            assert.isTrue(scrollToViewSpy.called);
        });
    });

    describe('.startClickSelecting()', () => {
        it('sets `state.isClickSelecting` to `true`', () => {
            self.actions.startClickSelecting();

            assert.isTrue(self.state.isClickSelecting);
        });
    });

    describe('.selectOption()', () => {
        it('sets `state.selectedIndex` to the provided index', () => {
            self.actions.selectOption(2);

            assert.equal(self.state.selectedIndex, 2);
        });

        it('sets `state.isClickSelecting` to `false`', () => {
            self.actions.startClickSelecting();

            assert.isTrue(self.state.isClickSelecting);

            self.actions.selectOption(2);

            assert.isFalse(self.state.isClickSelecting);
        });

        it(
            'it does not set `state.selectedIndex` to the provided ' +
            'index, if the option is disabled',
            () => {
                self.state.groups[0].options[2].isDisabled = true;

                self.actions.selectOption(2);

                assert.notEqual(self.state.selectedIndex, 2);
            }
        );

        it('revalidates the instance if `state.isInvalid` is `true`', () => {
            self.state.isInvalid = true;

            self.actions.selectOption(2);

            assert.isFalse(self.state.isInvalid);
        });

        it('closes the instance if open and close parameter ommited', () => {
            self.state.bodyStatus = BodyStatus.OPEN_ABOVE;

            self.actions.selectOption(2);

            assert.isFalse(self.state.isOpen);
        });

        it('does not close the instance if open and close parameter passed as `false`', () => {
            self.state.bodyStatus = BodyStatus.OPEN_ABOVE;

            self.actions.selectOption(2, false);

            assert.isTrue(self.state.isOpen);
        });

        it('calls `actions.scrollToView` if searching', () => {
            const scrollToViewSpy = spy(self.actions, 'scrollToView');

            self.state.isSearching = true;

            self.actions.selectOption(2);

            assert.isTrue(scrollToViewSpy.called);
        });
    });

    describe('.useNative()', () => {
        it('sets `state.isUseNativeMode`', () => {
            self.actions.useNative();

            assert.isTrue(self.state.isUseNativeMode);
        });
    });
});