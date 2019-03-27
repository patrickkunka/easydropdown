import Config from '../../Config/Config';
import IActions from '../../State/Interfaces/IActions';
import State    from '../../State/State';

const POLL_INTERVAL_DURATION = 100;

function pollForSelectChange(
    selectElement: HTMLSelectElement,
    state: State,
    actions: IActions,
    config: Config
): number {
    let lastValue: string = selectElement.value;

    const pollIntervalId = window.setInterval(() => {
        if (selectElement.value !== lastValue) {
            const selectedIndex = state.getOptionIndexFromValue(selectElement.value);

            actions.selectOption(selectedIndex, config.behavior.closeOnSelect);
            actions.focusOption(selectedIndex, true);
        }

        lastValue = selectElement.value;
    }, POLL_INTERVAL_DURATION);

    return pollIntervalId;
}

export default pollForSelectChange;