import IHandlerParams from '../../Events/Interfaces/IHandlerParams';

const killSelectReaction = (select: HTMLSelectElement, {actions, timers}: IHandlerParams): void => {
    const keyingResetDuration = 100;

    window.clearTimeout(timers.keyingTimeoutId);

    actions.keying();

    timers.keyingTimeoutId = window.setTimeout(() => actions.resetKeying(), keyingResetDuration);

    select.disabled = true;

    setTimeout(() => {
        select.disabled = false;
        select.focus();
    });
};

export default killSelectReaction;