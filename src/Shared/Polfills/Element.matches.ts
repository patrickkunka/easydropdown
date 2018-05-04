if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
}