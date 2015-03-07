import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Router from './Router';
import Configuration from './Configuration';
import ServerController from './Shared/ServerController'

class RodanClient extends Marionette.Application
{
    initialize()
    {
        this.router = new Router();
        this.appConfiguration = Configuration;

        this.serverController = new ServerController(this.appConfiguration);
    }

    onStart()
    {
        if (Backbone.history)
        {
            Backbone.history.start({pushState: true});
        }
    }
}

export default RodanClient;