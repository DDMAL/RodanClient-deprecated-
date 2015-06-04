import Marionette from 'backbone.marionette';

class ProjectListItemView extends Marionette.ItemView
{
    get template()
    {
        return '#project-view';
    }
    get tagName()
    {
        return 'tr';
    }
}

export default ProjectListItemView;
