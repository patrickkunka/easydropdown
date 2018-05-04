if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}

import factory from './Easydropdown/factory';

module.exports = factory;