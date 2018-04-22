import Option from './Option';

class Group {
    public label:      string   = '';
    public options:    Option[] = [];
    public isDisabled: boolean  = false;

    public get totalOptions(): number {
        return this.options.length;
    }

    public get hasLabel(): boolean {
        return this.label !== '';
    }
}

export default Group;