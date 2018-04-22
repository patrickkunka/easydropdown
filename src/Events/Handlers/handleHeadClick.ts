import IActions from '../../State/Interfaces/IActions';

function handleHeadClick(this: IActions) {
    this.openAbove();
}

export default handleHeadClick;