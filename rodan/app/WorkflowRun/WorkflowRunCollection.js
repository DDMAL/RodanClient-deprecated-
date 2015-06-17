import Backbone from 'backbone';
import WorkflowRun from './WorkflowRun';

class WorkflowRunCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.model = WorkflowRun;

        super(options);
    }

    parse(response)
    {
        return response.results;
    }
}

export default WorkflowRunCollection;