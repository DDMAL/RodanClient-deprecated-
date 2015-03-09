import Marionette from 'backbone.marionette';

import { mapFromJsonObject } from '../Helpers/Utilities';
import { Events } from '../Configuration';

class ServerController extends Marionette.Object
{
    constructor(configuration)
    {
        super();

        this.rodanServer = configuration.rodanServer;
        this.authenticationType = configuration.authenticationType;
        this.routes = null;
        this.serverConfiguration = null;

        this.on(Events.RoutesLoaded, () =>
        {
            console.debug('Routes Loaded');
        });

        this.getRoutes();
    }

    get server()
    {
        return this.rodanServer;
    }
    /*
    * Fetches the routes from the Rodan server. This is the first function to be called in the
    * Rodan loading process. It hits the root endpoint on the Rodan server and from there downloads
    * all of the path endpoints required to automatically configure the client application.
    * */
    getRoutes()
    {
        var routeRequest = new XMLHttpRequest();

        // FYI: the use of the Fat arrow maps `this` to `ServerController`, not the request object.
        routeRequest.onload = (event) =>
        {
            if (routeRequest.response && routeRequest.status === 200)
            {
                var resp = JSON.parse(routeRequest.response);

                this.routes = mapFromJsonObject(resp.routes);
                this.serverConfiguration = mapFromJsonObject(resp.configuration);

                this.trigger(Events.RoutesLoaded);
            }
            else
            {
                console.error('Routes could not be loaded from the server.');
            }
        };

        routeRequest.open('GET', this.rodanServer, true);
        routeRequest.setRequestHeader('Accept', 'application/json');
        routeRequest.send();
    }

    get authenticationRoute()
    {
        switch (this.authenticationType)
        {
            case 'session':
                return this.routeForRouteName('session-auth');
            case 'token':
                return this.routeForRouteName('token-auth');
            default:
                console.error('An acceptable Authentication Type was not provided');
                break;
        }
    }

    get statusRoute()
    {
        return this.routeForRouteName('session-status');
    }

    get logoutRoute()
    {
        return this.routeForRouteName('session-close');
    }

    routeForRouteName(aName)
    {
        if (this.routes.has(aName))
        {
            return this.routes.get(aName);
        }
        else
        {
            return null;
        }
    }
}

export default ServerController;
