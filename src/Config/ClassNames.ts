import IClassNames from './Interfaces/IClassNames';

class ClassNames implements IClassNames {
    public root: string = 'edd-root';
    public head: string = 'edd-head';
    public body: string = 'edd-body';

    constructor() {
        Object.seal(this);
    }
}

export default ClassNames;