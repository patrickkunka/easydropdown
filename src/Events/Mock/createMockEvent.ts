import {spy} from 'sinon';

const createMockEvent = (target = document.createElement('div')) => {
    const mockEvent: any = {
        preventDefault: spy(),
        stopPropagation: spy(),
        target
    };

    return mockEvent;
};

export default createMockEvent;