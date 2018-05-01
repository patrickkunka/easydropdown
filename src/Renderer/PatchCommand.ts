import DomChangeType    from './Constants/DomChangeType';
import IAttributeChange from './Interfaces/IAttributeChange';

class PatchCommand {
    public type:             DomChangeType;
    public newNode:          Node               = null;
    public newInnerHtml:     string             = '';
    public newTextContent:   string             = '';
    public attributeChanges: IAttributeChange[] = [];
    public childCommands:    PatchCommand[]      = [];
    public index:            number             = null;
}

export default PatchCommand;