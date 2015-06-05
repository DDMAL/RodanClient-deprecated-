import Marionette from 'backbone.marionette';

class ProjectHeaderView extends Marionette.ItemView
{
    get template()
    {
        return '#project-view-header';
    }

    modelEvents()
    {
        return {
            'change': 'render'
        };
    }
}

export default ProjectHeaderView;
