import Marionette from 'backbone.marionette';

class WorkflowListItemView extends Marionette.ItemView
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
            'click': 'showWorkflow'
        }
    }

    showWorkflow(event)
    {
        var url = this.model.get('url');
        this.trigger('WorkflowSelected', url);
    }
}

export default WorkflowListItemView;
