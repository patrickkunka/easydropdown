function isMobilePlatform(userAgent: string): boolean {
    const isIos = /(ipad|iphone|ipod)/gi.test(userAgent);
    const isAndroid = /android/gi.test(userAgent);
    const isOperaMini = /opera mini/gi.test(userAgent);
    const isWindowsPhone = /windows phone/gi.test(userAgent);

    if (isIos || isAndroid || isOperaMini || isWindowsPhone) {
        return true;
    }

    return false;
}

export default isMobilePlatform;