import Backbone from 'backbone';
import Workflow from './Workflow';

class WorkflowCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.model = Workflow;

        super(options);
    }
}

export default WorkflowCollection;