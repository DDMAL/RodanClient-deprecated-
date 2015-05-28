import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Events from './Events';

import AppController from './Shared/AppController'

class Router extends Marionette.AppRouter
{
    constructor()
    {
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
        this.rodanChannel.on(Events.UserDidNavigate, this.navigateToRoute);

        this.routes = {
            '': 'root',
            'projects': 'showProjectsList',
            'logout': 'logOut'
        };

    showProjectsList() {
        console.log('showprojectslist');
    }

    logOut() {
        console.log('logout');
    }

        super();
    }

    navigateToRoute(route)
    {
        //@TODO can this be made more elegant? issue: 'this' is rodanChannel, not appInstance.router
        this.request(Events.CurrentApplication).router.navigate(route, {trigger: true});
    }
}

export default Router;