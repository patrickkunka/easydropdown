import IHandlerParams from './IHandlerParams';

type IEventHandler = (e: Event, params: IHandlerParams) => void;

export default IEventHandler;