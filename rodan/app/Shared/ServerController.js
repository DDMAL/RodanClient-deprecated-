import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

class ServerController extends Marionette.Object
{
    constructor(configuration)
    {
        super();

        this.rodanServer = configuration.rodanServer;
        this.authenticationType = configuration.authenticationType;
        this.routes = null;
        this.serverConfiguration = null;

        this.on('routesloaded', (data) =>
        {
            console.log('routes have loaded');
        });

        this.getRoutes();
    }

    getRoutes()
    {
        var routeRequest = new XMLHttpRequest();

        // FYI: the use of the Fat arrow maps `this` to `ServerController`, not the request object.
        routeRequest.onload = (event) =>
        {
            if (routeRequest.response && routeRequest.status === 200)
            {
                var resp = JSON.parse(routeRequest.response);

                this.routes = resp.routes;
                this.serverConfiguration = resp.configuration;

                this.triggerMethod('routesloaded', this.routes);
            }
            else
            {
                console.error('Routes could not be loaded from the server.');
            }
        };

        routeRequest.open('GET', this.rodanServer, true);
        routeRequest.setRequestHeader('Accept', 'application/json');

        if (this.authenticationType === 'session')
        {
            routeRequest.withCredentials = true;
        }

        routeRequest.send();
    }

    get authenticationRoute()
    {
        switch (this.authenticationType)
        {
            case 'session':
                return this.routes['session-auth'];
                break;
            case 'token':
                return this.routes['token-auth'];
                break;
            default:
                console.error("An acceptable Authentication Type was not provided");
                break;
        }
    }

}

export default ServerController;