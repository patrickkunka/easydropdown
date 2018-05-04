import merge from 'helpful-merge';

import IActions            from './Interfaces/IActions';
import IOnAction           from './Interfaces/IOnAction';
import IPropertyDescriptor from './Interfaces/IPropertyDescriptor';
import resolveActions      from './resolveActions';
import State               from './State';

class StateManager {
    public static proxyActions(state: State, injectedActions: any, onAction: IOnAction): IActions {
        const stateProxy = StateManager.createStateProxy(state, onAction);
        const actions = resolveActions(stateProxy);

        merge(actions, injectedActions);

        return actions;
    }

    private static createStateProxy(state: State, onAction: IOnAction): State {
        return Object.seal(
            StateManager
                .getPropertyDescriptorsFromValue(state, onAction)
                .reduce((proxy, {key, get, set}) => Object.defineProperty(
                    proxy,
                    key,
                    {
                        enumerable: true,
                        get,
                        set
                    }
                ), {})
        );
    }

    private static getPropertyDescriptorsFromValue(state: State, onAction: IOnAction): IPropertyDescriptor[] {
        const prototype = Object.getPrototypeOf(state);
        const allKeys = Object.keys(state).concat(Object.keys(prototype));

        return allKeys
            .reduce((localDescriptors, key) => {
                const propertyDescriptor =
                    Object.getOwnPropertyDescriptor(state, key) ||
                    Object.getOwnPropertyDescriptor(prototype, key);

                const isAccessorProperty = typeof propertyDescriptor.get === 'function';

                localDescriptors.push({
                    get: StateManager.readPropertyValue.bind(null, state, key),
                    set: isAccessorProperty ?
                        void 0 : StateManager.updatePropertyValue.bind(null, state, key, onAction),
                    key
                });

                return localDescriptors;
            }, []);
    }

    private static readPropertyValue(state: State, key: string): any {
        return state[key];
    }

    private static updatePropertyValue(state: State, key: string, onAction: IOnAction, value: any): void {
        if (state[key] === value) return;

        state[key] = value;

        onAction(state, key);
    }
}

export default StateManager;