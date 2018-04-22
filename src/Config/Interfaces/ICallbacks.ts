import ICallback from './ICallback';

interface ICallbacks {
    onReady?: ICallback;
    onOpen?: ICallback;
    onClose?: ICallback;
    onSelect?: ICallback;
}

export default ICallbacks;