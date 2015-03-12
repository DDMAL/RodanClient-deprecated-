import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import Events from '../Events';
import User from '../User/User';

class AuthenticationController extends Marionette.Object
{
    constructor(serverController)
    {
        super();
        this.serverController = serverController;
        this.rodanChannel = Radio.channel('rodan');
    }

    checkAuthenticationStatus()
    {
        var authStatusRoute = this.serverController.statusRoute;
        var authRequest = new XMLHttpRequest();

        authRequest.onload = (event) =>
        {
            // stuff
            if (authRequest.responseText === null)
            {
                this.rodanChannel.trigger(Events.AuthenticationError);
            }

            switch (authRequest.status)
            {
                case 200:
                    var parsed = JSON.parse(authRequest.responseText);
                    this.activeUser = new User(parsed);
                    this.rodanChannel.trigger(Events.AuthenticationSuccess);
                    break;
                case 400:
                    this.rodanChannel.trigger(Events.AuthenticationError);
                    break;
                case 401:
                    this.rodanChannel.trigger(Events.UserMustAuthenticate);
                    break;
                case 403:
                    this.rodanChannel.trigger(Events.UserCannotAuthenticate);
                    break;
                default:
                    this.rodanChannel.trigger(Events.AuthenticationError);
            }
        };

        authRequest.ontimeout = (event) =>
        {
            this.rodanChannel.trigger(Events.ServerWentAway);
        }

        authRequest.open('GET', authStatusRoute, true);
        authRequest.setRequestHeader('Accept', 'application/json');

        if (this.serverController.authenticationType === 'token')
        {
            var authToken = this.serverController.authenticationToken;
            authRequest.setRequestHeader('Authorization', 'Token ' + authToken);
        }
        else
        {
            // session auth
            var sessionCookie = this.serverController.CSRFToken.value;
            authRequest.withCredentials = true;
            authRequest.setRequestHeader('X-CSRFToken', sessionCookie);
        }

        authRequest.send();
    }
}

export default AuthenticationController;