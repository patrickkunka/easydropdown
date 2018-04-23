import IEventHandler from './IEventHandler';

interface IEventBinding {
    type: string;
    target?: HTMLElement|Window|Document;
    debounce?: number;
    throttle?: number;
    handler?: IEventHandler;
}

export default IEventBinding;