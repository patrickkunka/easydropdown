import IBehavior from './Interfaces/IBehavior';

class Behavior implements IBehavior {
    public showPlaceholderOnOpen: boolean = true;
    public openOnFocus: boolean = false;
    public closeOnSelect: boolean = false;
    public maxVisibleOptions: number = 10;
}

export default Behavior;