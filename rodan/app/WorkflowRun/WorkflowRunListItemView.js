import Marionette from 'backbone.marionette';

class WorkflowRunListItemView extends Marionette.ItemView
{
    get template()
    {
        return '#workflow-list-item-view';
    }

    get tagName()
    {
        return 'tr';
    }

    modelEvents()
    {
        return {
            'change': 'render'
        };
    }

    events()
    {
        return {
            'click': 'showWorkflowRun'
        }
    }

    showWorkflowRun(event)
    {
        var url = this.model.get('url');
        var id = this.model.id;
        this.trigger('WorkflowRunSelected', {workflowRunURL: url, workflowRunID: id});
    }

    onRender()
    {
        if (this.model.get('name') === null)
        {
            this.model.set('name', 'null');
        }
    }
}

export default WorkflowRunListItemView;
