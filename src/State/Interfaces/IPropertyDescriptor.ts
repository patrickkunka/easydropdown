interface IPropertyDescriptor {
    key: string;
    get: () => any;
    set: (value) => void;
}

export default IPropertyDescriptor;