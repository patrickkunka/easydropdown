import getIsMobilePlatform from '../../Shared/Util/getIsMobilePlatform';
import IHandlerParams   from '../Interfaces/IHandlerParams';

function handleWindowResize(
    injectedGetIsMobilePlatform: (ua: string) => boolean,
    e: Event,
    {actions}: IHandlerParams
): void {
    if (injectedGetIsMobilePlatform(window.navigator.userAgent)) return;

    actions.close();
}

const boundHandleWindowResize = handleWindowResize.bind(null, getIsMobilePlatform);

export {
    boundHandleWindowResize as default,
    handleWindowResize
};