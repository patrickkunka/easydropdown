import State from '../State';

type IOnAction = (state: State, key: string, value: any) => void;

export default IOnAction;