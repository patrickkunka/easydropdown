import State from '../../State/State';

const POLL_INTERVAL_DURATION = 300;

function pollForSelectMutation(selectElement: HTMLSelectElement, state: State, handleMutation: () => void): number {
    let lastOuterHtml: string = selectElement.outerHTML;

    const pollIntervalId = window.setInterval(() => {
        const {outerHTML} = selectElement;

        if (outerHTML !== lastOuterHtml && !state.isKeying) {
            handleMutation();
        }

        lastOuterHtml = outerHTML;
    }, POLL_INTERVAL_DURATION);

    return pollIntervalId;
}

export default pollForSelectMutation;