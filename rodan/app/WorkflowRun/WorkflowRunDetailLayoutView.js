import Marionette from 'backbone.marionette';

class WorkflowRunDetailLayoutView extends Marionette.ItemView
{
    get template()
    {
        return '#workflow-run-detail-view';
    }

    modelEvents()
    {
        return {
            'change': 'render'
        };
    }
}

export default WorkflowRunDetailLayoutView;
