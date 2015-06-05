import Backbone from 'backbone';
import WorkflowListItem from './WorkflowListItem';

class WorkflowCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.model = WorkflowListItem;

        super(options);
    }
}

export default WorkflowCollection;