import DomChangeType from '../Constants/DomChangeType';

import IAttributeChange from './IAttributeChange';

interface IPatchCommand {
    type?:             DomChangeType;
    newNode?:          Node;
    newInnerHtml?:     string;
    newTextContent?:   string;
    attributeChanges?: IAttributeChange[];
    childCommands?:    IPatchCommand[];
    index?:            number;
}

export default IPatchCommand;