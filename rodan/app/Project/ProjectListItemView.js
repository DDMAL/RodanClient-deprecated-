import Marionette from 'backbone.marionette';

class ProjectListItemView extends Marionette.ItemView
{
    get template()
    {
        return '#project-list-item-view';
    }
    get tagName()
    {
        return 'tr';
    }
    events()
    {
        return {
            'click': 'showProject'
        }
    }

    showProject(event)
    {
        var projectID = this.model.get('uuid'); // model.id isn't working for some reason
        var url = this.model.get('url');
        this.trigger('ProjectSelected', {projectID: projectID, projectURL: url});
    }
}

export default ProjectListItemView;
