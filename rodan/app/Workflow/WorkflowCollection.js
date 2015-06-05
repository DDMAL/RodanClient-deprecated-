import Backbone from 'backbone';
import Radio from 'backbone.radio';
import WorkflowListItem from './WorkflowListItem';
import Events from '../Events';

class WorkflowCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.rodanChannel = Radio.channel('rodan');
        this.model = WorkflowListItem;
        var appInstance = this.rodanChannel.request(Events.CurrentApplication);

        super(options);
    }
}

export default WorkflowCollection;