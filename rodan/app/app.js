import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import RodanRouter from './router';

class RodanClient extends Marionette.Application
{
    initialize()
    {
    }

    onStart()
    {
        new RodanRouter();

        if (Backbone.history)
        {
            Backbone.history.start();
        }
    }
}

export default RodanClient;