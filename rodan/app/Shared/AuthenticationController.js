import Marionette from 'backbone.marionette';


class AuthenticationController extends Marionette.Object
{
    constructor(serverController)
    {
        super();
        this.serverController = serverController;
    }

    checkAuthenticationStatus()
    {
        var authStatusRoute = this.serverController.statusRoute;

        var authRequest = new XMLHTTPRequest();
        authRequest.onload = (event) =>
        {
            // stuff
            console.log('auth request route');
        };

        authRequest.open('GET', this.serverController.server, true);
        authRequest.setRequestHeader('Accept', 'application/json');
        authRequest.send();
    }
}

export default AuthenticationController;