import IHandlerParams from '../Interfaces/IHandlerParams';

function handleItemsListScroll(e: Event, {state, actions, dom}: IHandlerParams): void {
    e.stopPropagation();

    const {offsetHeight, scrollHeight, scrollTop} = dom.itemsList;

    if (scrollTop === 0) {
        actions.topOut();
    } else if (scrollTop === scrollHeight - offsetHeight) {
        actions.bottomOut();
    } else {
        actions.scroll();
    }
}

export default handleItemsListScroll;