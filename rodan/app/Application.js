import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import Router from './Router';
import { Configuration, Events } from './Configuration';
import ServerController from './Shared/ServerController';
import AuthenticationController from './Shared/AuthenticationController';

class RodanClient extends Marionette.Application
{
    initialize()
    {
        this.router = new Router();
        this.appConfiguration = Configuration;

        this.serverController = new ServerController(this.appConfiguration);
        this.authenticationController = new AuthenticationController(this.serverController);

        this.on(Events.RoutesLoaded, (data) =>
        {
            console.debug('Foo');
        });

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