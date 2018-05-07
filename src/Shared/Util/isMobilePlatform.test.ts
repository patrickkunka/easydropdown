import {assert} from 'chai';

import isMobilePlatform from './isMobilePlatform';

describe('isMobilePlatform()', () => {
    it('returns `true` if the user agent matches a known mobile device', () => {
        assert.isTrue(isMobilePlatform('iphone'));
        assert.isTrue(isMobilePlatform('android'));
        assert.isTrue(isMobilePlatform('Windows Phone'));
        assert.isTrue(isMobilePlatform('opera mini'));
    });
});