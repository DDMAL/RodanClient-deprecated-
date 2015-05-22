import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Project from './Project';
import Events from '../Events';

class ProjectCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.rodanChannel = Radio.channel('rodan');
        this.model = Project;
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