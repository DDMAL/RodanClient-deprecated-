import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Events from '../Events';

class Workflow extends Backbone.Model
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
            name: 'Loading Workflow...'
        };
    }
}

export default Workflow;