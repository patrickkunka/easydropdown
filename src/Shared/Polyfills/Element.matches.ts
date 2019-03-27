if (!Element.prototype.matches) {
    Element.prototype.matches = (Element.prototype as any).msMatchesSelector;
}