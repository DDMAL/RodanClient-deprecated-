import Marionette from 'backbone.marionette';

class ResourceListItemView extends Marionette.ItemView
{
    get template()
    {
        return '#resource-list-item-view';
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
            'click': 'showResource'
        }
    }

    showResource(event)
    {
        var url = this.model.get('url');
        this.trigger('ResourceSelected', url);
    }
}

export default ResourceListItemView;
