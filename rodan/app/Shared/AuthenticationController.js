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
                    console.debug('Authentication Success.');
                    var parsed = JSON.parse(authRequest.responseText);
                    //this.serverController.activeUser = new User();
                    this.activeUser = new User(parsed);
                    //console.log(user);
                    this.rodanChannel.trigger(Events.AuthenticationSuccess);
                    break;
                case 400:
                    console.debug('Bad authentication status request.');
                    this.rodanChannel.trigger(Events.AuthenticationError);
                    break;
                case 401:
                    console.debug('User must authenticate.');
                    this.rodanChannel.trigger(Events.UserMustAuthenticate);
                    break;
                case 403:
                    console.debug('Forbidden');
                    this.rodanChannel.trigger(Events.UserCannotAuthenticate);
            }
        };

        authRequest.ontimeout = (event) =>
        {
            console.debug('auth request timeout');
            this.rodanChannel.trigger(Events.ServerWentAway);
        }

        authRequest.open('GET', authStatusRoute, true);
        authRequest.setRequestHeader('Accept', 'application/json');

        if (this.serverController.authenticationType === 'token')
        {
            console.debug('Setting auth token before checking status');
            var authToken = this.serverController.authenticationToken;
            authRequest.setRequestHeader('Authorization', 'Token ' + authToken);
        }
        else
        {
            // session auth
            console.debug('Using session authentication');
            var sessionCookie = this.serverController.CSRFToken.value;
            authRequest.withCredentials = true;
            authRequest.setRequestHeader('X-CSRFToken', sessionCookie);
        }

        console.log('sending');
        authRequest.send();
    }
}

export default AuthenticationController;