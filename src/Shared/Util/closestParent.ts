/**
 * Returns the closest parent of a given element matching the
 * provided selector, optionally including the element itself.
 */

function closestParent(
    el: HTMLElement,
    selector: string,
    includeSelf: boolean = false
): HTMLElement {
    let parent = el.parentNode as HTMLElement;

    if (includeSelf && el.matches(selector)) {
        return el;
    }

    while (parent && parent !== document.body) {
        if (parent.matches && parent.matches(selector)) {
            return parent;
        } else if (parent.parentNode) {
            parent = parent.parentNode as HTMLElement;
        } else {
            return null;
        }
    }

    return null;
}

export default closestParent;