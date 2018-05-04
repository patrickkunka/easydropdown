import merge from 'helpful-merge';

import Config from '../Config/Config';
import Group  from './Group';
import Option from './Option';
import State  from './State';

class StateMapper {
    public static mapFromSelect(selectElement: HTMLSelectElement, config: Config): State {
        const state = new State(null, config);

        let isWithinGroup = false;

        state.name = selectElement.name;
        state.isDisabled = selectElement.disabled;
        state.isUseNativeMode = StateMapper.isMobilePlatform(window.navigator.userAgent);

        for (let i = 0, child: Element; (child = selectElement.children[i]); i++) {
            if (i === 0 && child.getAttribute('data-placeholder') !== null) {
                state.placeholder = child.textContent;
                (child as HTMLOptionElement).value = '';

                continue;
            }

            if (child instanceof HTMLOptionElement) {
                if (isWithinGroup === false) {
                    state.groups.push(StateMapper.mapGroup());

                    isWithinGroup = true;
                }

                state.lastGroup.options.push(StateMapper.mapOption(child));

                if (child.selected) state.selectedIndex = state.totalOptions - 1;
            } else if (child instanceof HTMLOptGroupElement) {
                isWithinGroup = true;

                state.groups.push(StateMapper.mapGroup(child));

                for (let j = 0, groupChild: Element; (groupChild = child.children[j]); j++) {
                    state.lastGroup.options.push(
                        StateMapper.mapOption(
                            groupChild as HTMLOptionElement,
                            child as HTMLOptGroupElement
                        )
                    );

                    if ((groupChild as HTMLOptionElement).selected) state.selectedIndex = state.totalOptions - 1;
                }

                isWithinGroup = false;
            } else {
                throw new TypeError(
                    `[EasyDropDown] Invalid child tag "${child.tagName}" found in provided \`<select>\` element`
                );
            }
        }

        return Object.seal(state);
    }

    private static mapGroup(group: HTMLOptGroupElement = null): Group {
        return merge(new Group(), {
            label: group ? group.label : '',
            isDisabled: group ? group.disabled : false
        });
    }

    private static mapOption(option: HTMLOptionElement, group: HTMLOptGroupElement = null): Option {
        if (!(option instanceof HTMLOptionElement)) throw new TypeError('[EasyDropDown] Invalid markup structure');

        const isParentGroupDisabled = group !== null && group.disabled;

        return merge(new Option(), {
            label: option.textContent,
            value: option.value,
            isDisabled: option.disabled || isParentGroupDisabled
        });
    }

    private static isMobilePlatform(userAgent: string): boolean {
        const isIos = /(ipad|iphone|ipod)/gi.test(userAgent);
        const isAndroid = /android/gi.test(userAgent);
        const isOperaMini = /opera mini/gi.test(userAgent);
        const isWindowsPhone = /windows phone/gi.test(userAgent);

        if (isIos || isAndroid || isOperaMini || isWindowsPhone) {
            return true;
        }

        return false;
    }
}

export default StateMapper;