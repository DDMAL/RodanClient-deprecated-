import Backbone from 'backbone';
import Radio from 'backbone.radio';
import ProjectListItem from './ProjectListItem';
import Events from '../Events';

class ProjectCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.rodanChannel = Radio.channel('rodan');
        this.model = ProjectListItem;
        var appInstance = this.rodanChannel.request(Events.CurrentApplication);
        this.url = appInstance.serverController.routeForRouteName('projects');

        super(options);
    }

    parse(resp, options)
    {
        return resp.results;
    }
}

export default ProjectCollection;