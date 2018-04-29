const POLL_INTERVAL_DURATION = 300;

function pollForSelectMutation(selectElement: HTMLSelectElement, handleMutation: () => void): number {
    let lastOuterHtml: string = selectElement.outerHTML;

    const pollIntervalId = window.setInterval(() => {
        const {outerHTML} = selectElement;

        if (outerHTML !== lastOuterHtml) {
            handleMutation();
        }

        lastOuterHtml = outerHTML;
    }, POLL_INTERVAL_DURATION);

    return pollIntervalId;
}

export default pollForSelectMutation;