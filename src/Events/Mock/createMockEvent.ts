import {spy} from 'sinon';

const createMockEvent = (target = document.createElement('div')) => {
    const mockEvent: any = {
        stopPropagation: spy(),
        target
    };

    return mockEvent;
};

export default createMockEvent;