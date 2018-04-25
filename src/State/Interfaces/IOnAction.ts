import State from '../State';

type IOnAction = (state: State, updatedKey: string) => void;

export default IOnAction;