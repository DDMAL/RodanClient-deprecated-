import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import Router from './Router';
import Events from './Events';
import Configuration from './Configuration';
import ServerController from './Shared/ServerController';
import AuthenticationController from './Shared/AuthenticationController';
import UserCollection from './User/UserCollection';
import ProjectCollection from './Project/ProjectCollection';

import LoginView from './User/LoginView'
import AppLayoutView from './Shared/AppLayoutView'
import NavigationView from './Shared/NavigationView'
import ProjectCollectionView from './Project/ProjectCollectionView'

class RodanClient extends Marionette.Application
{
    initialize()
    {
        this.appConfiguration = Configuration;

        $.ajaxPrefilter(function(options, originalOptions, jqXHR)
        {
            console.log('ajax prefilter');
            options.xhrFields = {
                withCredentials: true
            };
        });

        this.rodanChannel = Radio.channel('rodan');
        // when a request is made for the current application, respond with this instance.
        this.rodanChannel.reply(Events.CurrentApplication, this);

        this.router = new Router();
        this.serverController = new ServerController(this.appConfiguration);
        this.authenticationController = new AuthenticationController(this.serverController);

        this.appLayoutView = new AppLayoutView();
        this.appLayoutView.render();

        this.rodanChannel.on(Events.RoutesLoaded, () =>
        {
            this.authenticationController.checkAuthenticationStatus();
        });

        this.rodanChannel.on(Events.UserMustAuthenticate, () =>
        {
            this.appLayoutView.content.show(new LoginView());
        });

        this.rodanChannel.on(Events.AuthenticationAttempt, (args) =>
        {
            this.authenticationController.login(args.user, args.pass);
        });

        this.rodanChannel.on(Events.AuthenticationSuccess, () =>
        {
            this.appLayoutView.menu.show(new NavigationView());

            // create new collection
            var projectCollection = new ProjectCollection();
            projectCollection.fetch();

            // show collection
            this.appLayoutView.content.show(new ProjectCollectionView({collection: projectCollection}));
        });

        this.rodanChannel.on(Events.ServerWentAway, () =>
        {
            // do something great.
        });
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