import isMobilePlatform from '../../Shared/Util/isMobilePlatform';
import IHandlerParams   from '../Interfaces/IHandlerParams';

function handleWindowResize(
    injectedIsMobilePlatform: (ua: string) => boolean,
    e: Event,
    {actions}: IHandlerParams
): void {
    if (injectedIsMobilePlatform(window.navigator.userAgent)) return;

    actions.close();
}

const boundHandleWindowResize = handleWindowResize.bind(null, isMobilePlatform);

export {
    boundHandleWindowResize as default,
    handleWindowResize
};