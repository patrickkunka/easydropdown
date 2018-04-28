import ICallback from './ICallback';

interface ICallbacks {
    onOpen?: ICallback;
    onClose?: ICallback;
    onSelect?: ICallback;
}

export default ICallbacks;