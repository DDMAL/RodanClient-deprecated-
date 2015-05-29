import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Events from '../Events';
import User from '../User/User';
import Cookie from '../Helpers/Cookie';

import $ from 'jquery';

class AuthenticationController extends Marionette.Object
{
    constructor(serverController)
    {
        super();
        this.serverController = serverController;
        this.rodanChannel = Radio.channel('rodan');

        this.rodanChannel.on(Events.AuthenticationSuccess, () => this.defineAJAXFilter());
        this.rodanChannel.on(Events.RoutesLoaded, () => this.checkAuthenticationStatus());
        this.rodanChannel.on(Events.AuthenticationAttempt, (args) => this.login(args.user, args.pass));
    }

    defineAJAXFilter()
    {
        var instance = this;

        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            options.xhrFields = {
                withCredentials: true
            };

            if (!options.beforeSend) {
                options.beforeSend = function (xhr)
                {
                    if (instance.serverController.authenticationType === 'token')
                    {
                        xhr.setRequestHeader('Authorization', 'Token ' + instance.serverController.authenticationToken);
                    }
                };
            }
        });
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
                    break;
            }
        };

        authRequest.ontimeout = (event) =>
        {
            this.rodanChannel.trigger(Events.ServerWentAway);
        };

        authRequest.open('GET', authStatusRoute, true);
        authRequest.setRequestHeader('Accept', 'application/json');

        if (this.serverController.authenticationType === 'token')
        {
            var authToken = this.serverController.authenticationToken;
            authRequest.setRequestHeader('Authorization', 'Token ' + authToken);
        }
        else if (this.serverController.authenticationType === 'session')
        {
            console.log('Injecting the cookie for session authentication');
            // if the server controller doesn't have the CSRF Token, set it now
            if (!this.serverController.CSRFToken.value)
            {
                this.serverController.CSRFToken = new Cookie('csrftoken');//reads cookie from browser
            }

            authRequest.withCredentials = true;
            authRequest.setRequestHeader('X-CSRFToken', this.serverController.CSRFToken.value);
        }

        authRequest.send();
    }

    login(username, password)
    {
        // request from the server and set the authentication tokens
        var authRoute = this.serverController.authenticationRoute;
        var authType = this.serverController.authenticationType;
        var loginRequest = new XMLHttpRequest();
        var requestBody;

        loginRequest.onload = (event) =>
        {
            if (loginRequest.statusText === null)
            {
                console.log('null resp');
            }

            switch (loginRequest.status)
            {
                case 200:
                    var parsed = JSON.parse(loginRequest.responseText);
                    this.activeUser = new User(parsed);
                    console.log('Success', this.activeUser);

                    if (authType === 'token')
                    {
                        this.serverController.authenticationToken = this.activeUser.attributes.token;
                    }
                    //else
                    //{
                    //    this.serverController.CSRFToken = new Cookie('csrftoken');
                    //}

                    this.rodanChannel.trigger(Events.AuthenticationSuccess);
                    break;
                case 400:
                    console.log('Bad request');
                    this.rodanChannel.trigger(Events.AuthenticationError);
                    break;
                case 401:
                    console.log('Authentication failed');
                    this.rodanChannel.trigger(Events.AuthenticationError); //@TODO AuthenticationFailed?
                    //this.rodanChannel.trigger(Events.UserMustAuthenticate); @TODO re-enable, this is a loop right now
                    break;
                case 403:
                    console.log('Forbidden');
                    this.rodanChannel.trigger(Events.UserCannotAuthenticate);
                    break;
                default:
                    console.log('Error: ', loginRequest.status);
                    break;
            }
        };

        loginRequest.open('POST', authRoute, true);

        if (authType === 'session')
        {
            //if (!this.serverController.CSRFToken)
            //    this.serverController.CSRFToken = new Cookie('csrftoken');//@TODO does this do what we want it to?

            loginRequest.withCredentials = true;
            loginRequest.setRequestHeader('X-CSRFToken', this.serverController.CSRFToken.value);
        }

        loginRequest.setRequestHeader('Accept', 'application/json');
        loginRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        requestBody = 'username=' + username + '&password=' + password;

        loginRequest.send(requestBody);
    }

    logout()
    {
        // request from the server and set the authentication tokens
        var logoutRoute = this.serverController.logoutRoute;
        var authType = this.serverController.authenticationType;
        var logoutRequest = new XMLHttpRequest();

        logoutRequest.onload = (event) => {
            if (logoutRequest.statusText === null) {
                console.log('null resp');
            }

            switch (logoutRequest.status) {
                case 200:
                    var parsed = JSON.parse(logoutRequest.responseText);
                    console.log('Logout success');
                    //remove cookies here

                    this.rodanChannel.trigger(Events.DeauthenticationSuccess);
                    //this.rodanChannel.trigger(Events.UserMustAuthenticate); @TODO trigger this to show login again
                    break;
                case 400:
                    console.log('Bad request');
                    this.rodanChannel.trigger(Events.AuthenticationError);
                    break;
                case 401:
                    console.log('Deauthentication failed');
                    this.rodanChannel.trigger(Events.AuthenticationError);
                    //this.rodanChannel.trigger(Events.UserMustAuthenticate); @TODO trigger this to show login again
                    break;
                case 403:
                    console.log('Forbidden');
                    this.rodanChannel.trigger(Events.UserCannotAuthenticate);
                    break;
                default:
                    console.log('Error: ', logoutRequest.status);
                    break;
            }
        }

        logoutRequest.open('POST', logoutRoute, true);
        logoutRequest.setRequestHeader('Accept', 'application/json');

        if (authType === 'session')
        {
            //if (!this.serverController.CSRFToken) @TODO necessary?
            //    this.serverController.CSRFToken = new Cookie();

            logoutRequest.withCredentials = true;
            logoutRequest.setRequestHeader('X-CSRFToken', this.serverController.CSRFToken.value);
        }
        else
        {
            var authToken = this.serverController.authenticationToken;
            logoutRequest.setRequestHeader('Authorization', 'Token ' + authToken);
        }

        logoutRequest.send();
    }
}

export default AuthenticationController;