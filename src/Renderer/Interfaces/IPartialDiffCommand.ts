import DomChangeType    from '../Constants/DomChangeType';
import IAttributeChange from '../Interfaces/IAttributeChange';

interface IPartialDiffCommand {
    type: DomChangeType;
    attributeChanges: IAttributeChange[];
}

export default IPartialDiffCommand;