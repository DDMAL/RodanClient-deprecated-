import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import Router from './Router';
import Configuration from './Configuration';
import Events from './Events';
import ServerController from './Shared/ServerController';
import AuthenticationController from './Shared/AuthenticationController';
import UserCollection from './User/UserCollection';
import ProjectCollection from './Project/ProjectCollection';


class RodanClient extends Marionette.Application
{
    initialize()
    {
        $.ajaxPrefilter(function(options, originalOptions, jqXHR)
        {
            console.log('ajax prefilter');
            options.xhrFields = {
                withCredentials: true
            };
        });

        this.rodanChannel = Radio.channel('rodan');

        this.router = new Router();
        this.appConfiguration = Configuration;

        this.serverController = new ServerController(this.appConfiguration);
        this.authenticationController = new AuthenticationController(this.serverController);

        this.rodanChannel.on(Events.RoutesLoaded, () =>
        {
            this.authenticationController.checkAuthenticationStatus();
            var projects = new ProjectCollection();
            projects.sync();
            projects.on('request', (project) =>
            {
                console.log('added!');
                console.log(project);
            })

        });

        this.rodanChannel.reply(Events.CurrentApplication, this);
    }

    onStart()
    {
        if (!Backbone.history)
        {
            Backbone.history.start({pushState: true});
        }
    }
}

export default RodanClient;