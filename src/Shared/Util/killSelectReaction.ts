const killSelectReaction = (select: HTMLSelectElement): void => {
    select.disabled = true;

    setTimeout(() => select.disabled = false);
};

export default killSelectReaction;