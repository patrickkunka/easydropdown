import Dom from '../Renderer/Dom';

import handleBodyClick       from './Handlers/handleBodyClick';
import handleBodyMousedown   from './Handlers/handleBodyMousedown';
import handleBodyMouseover   from './Handlers/handleBodyMouseover';
import handleHeadClick       from './Handlers/handleHeadClick';
import handleItemsListScroll from './Handlers/handleItemsListScroll';
import handleSelectBlur      from './Handlers/handleSelectBlur';
import handleSelectFocus     from './Handlers/handleSelectFocus';
import handleSelectInvalid   from './Handlers/handleSelectInvalid';
import handleSelectKeydown   from './Handlers/handleSelectKeydown';
import handleSelectKeypress  from './Handlers/handleSelectKeypress';
import handleWindowClick     from './Handlers/handleWindowClick';
import handleWindowResize    from './Handlers/handleWindowClick';
import IEventBinding         from './Interfaces/IEventBinding';

const getEventsList = (dom: Dom): IEventBinding[] => [
    {
        target: dom.head,
        type: 'click',
        handler: handleHeadClick
    },
    {
        target: dom.body,
        type: 'mousedown',
        handler: handleBodyMousedown
    },
    {
        target: dom.body,
        type: 'click',
        handler: handleBodyClick
    },
    {
        target: dom.body,
        type: 'mouseover',
        handler: handleBodyMouseover
    },
    {
        target: dom.itemsList,
        type: 'scroll',
        handler: handleItemsListScroll
    },
    {
        target: dom.select,
        type: 'keydown',
        handler: handleSelectKeydown
    },
    {
        target: dom.select,
        type: 'invalid',
        handler: handleSelectInvalid
    },
    {
        target: dom.select,
        type: 'keypress',
        handler: handleSelectKeypress
    },
    {
        target: dom.select,
        type: 'focus',
        handler: handleSelectFocus
    },
    {
        target: dom.select,
        type: 'blur',
        handler: handleSelectBlur
    },
    {
        target: document.documentElement,
        type: 'click',
        handler: handleWindowClick
    },
    {
        target: window,
        type: 'resize',
        handler: handleWindowResize,
        throttle: 100
    }
];

export default getEventsList;