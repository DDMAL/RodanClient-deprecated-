import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Events from '../Events';

import WorkflowCollection from '../Workflow/WorkflowCollection';
import ResourceCollection from '../Resource/ResourceCollection';

class Project extends Backbone.Model
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }

    defaults()
    {
        return {
            name: 'Loading Project...'
        };
    }

    get idAttribute()
    {
        return 'uuid';
    }

    // url should be set from getting the collection
    url()
    {
        //@TODO this can't be hardcoded
        return 'http://rodan-dev.simssa.ca/project/' + this.id + '/';
    }

    parse(response)
    {
        // this method is only called for Project.fetch, not ProjectCollection.fetch
        response.workflows = new WorkflowCollection(response.workflows);
        response.resources = new ResourceCollection(response.resources);
        return response;
    }
}

export default Project;