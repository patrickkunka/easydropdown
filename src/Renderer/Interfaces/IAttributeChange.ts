import AttributeChangeType from '../Constants/AttributeChangeType';

interface IAttributeChange {
    type: AttributeChangeType;
    name: string;
    value: string;
}

export default IAttributeChange;