import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Events from '../Events';

class WorkflowRun extends Backbone.Model
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }

    get idAttribute()
    {
        return 'uuid';
    }

    defaults()
    {
        return {
            name: 'Loading WorkflowRun...'
        };
    }
}

export default WorkflowRun;