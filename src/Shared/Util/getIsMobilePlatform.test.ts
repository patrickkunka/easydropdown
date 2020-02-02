import {assert} from 'chai';

import getIsMobilePlatform from './getIsMobilePlatform';

describe('getIsMobilePlatform()', () => {
    it('returns `true` if the user agent matches a known mobile device', () => {
        assert.isTrue(getIsMobilePlatform('iphone'));
        assert.isTrue(getIsMobilePlatform('android'));
        assert.isTrue(getIsMobilePlatform('Windows Phone'));
        assert.isTrue(getIsMobilePlatform('opera mini'));
    });
});