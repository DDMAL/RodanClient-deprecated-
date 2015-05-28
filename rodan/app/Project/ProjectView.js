import Marionette from 'backbone.marionette';

class ProjectView extends Marionette.ItemView
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

export default ProjectView;
