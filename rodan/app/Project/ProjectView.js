import Marionette from 'backbone.marionette';

class ProjectView extends Marionette.ItemView
{
    get template()
    {
        return '#project-view';
    }

    get modelEvents()
    {
        return {
            'change': 'render'
        };
    }
}

export default ProjectView;
