import Marionette from 'backbone.marionette';

class WorkflowDetailLayoutView extends Marionette.ItemView
{
    get template()
    {
        return '#workflow-detail-view';
    }

    modelEvents()
    {
        return {
            'change': 'render'
        };
    }
}

export default WorkflowDetailLayoutView;
