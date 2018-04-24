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

        for (let i = 0, child: Element; (child = selectElement.children[i]); i++) {
            if (i === 0 && child.getAttribute('data-placeholder') !== null) {
                state.placeholder = child.textContent;

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
                    state.lastGroup.options.push(StateMapper.mapOption(groupChild as HTMLOptionElement));

                    if ((groupChild as HTMLOptionElement).selected) state.selectedIndex = state.totalOptions - 1;
                }

                isWithinGroup = false;
            }
        }

        return Object.seal(state);
    }

    private static mapGroup(group: HTMLOptGroupElement = null): Group {
        return Object.assign(new Group(), {
            label: group ? group.label : '',
            isDisabled: group ? group.disabled : false
        });
    }

    private static mapOption(option: HTMLOptionElement): Option {
        if (!(option instanceof HTMLOptionElement)) throw new TypeError('[EasyDropDown] Invalid markup structure');

        return Object.assign(new Option(), {
            label: option.textContent,
            value: option.value || option.textContent,
            isDisabled: option.disabled
        });
    }
}

export default StateMapper;