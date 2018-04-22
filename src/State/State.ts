import Group from  './Group';
import Option from './Option';

const {assign} = Object;

class State {
    public groups:        Group[] = [];
    public focussedIndex: number  = -1;
    public selectedIndex: number  = -1;
    public name:          string  = '';
    public label:         string  = '';
    public autofocus:     boolean = false;
    public isDisabled:    boolean = false;

    constructor(stateRaw: any = null) {
        if (stateRaw) {
            assign(this, stateRaw);

            this.groups = this.groups.map(State.mapGroup);
        }
    }

    public get totalGroups(): number {
        return this.groups.length;
    }

    public get lastGroup(): Group {
        return this.groups[this.groups.length - 1];
    }

    public get totalOptions(): number {
        return this.groups.reduce((total: number, group: Group) => total + group.totalOptions, 0);
    }

    public get value(): string {
        let groupStartIndex = 0;

        if (this.selectedIndex < 0) return '';

        for (const group of this.groups) {
            const groupEndIndex = Math.max(0, groupStartIndex + group.totalOptions - 1);

            if (this.selectedIndex <= groupEndIndex) {
                const option = group.options[this.selectedIndex - groupStartIndex];

                return option.value;
            }

            groupStartIndex += group.totalOptions;
        }
    }

    public get isGrouped(): boolean {
        return Boolean(this.groups.find(group => group.hasLabel));
    }

    private static mapGroup = (groupRaw) => {
        const group = assign(new Group(), groupRaw);

        group.options = group.options.map(optionRaw => assign(new Option(), optionRaw));

        return group;
    }
}

export default State;