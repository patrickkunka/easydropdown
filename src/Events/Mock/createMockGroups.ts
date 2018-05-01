import Group  from '../../State/Group';
import Option from '../../State/Option';

const createMockGroups = (): Group[] => {
    const group = new Group();

    group.options = [
        new Option(),
        new Option(),
        new Option()
    ];

    return [group];
};

export default createMockGroups;