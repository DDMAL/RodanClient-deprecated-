import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Events from './Events';

class Router extends Backbone.Router
{
    constructor()
    {
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);

        this.routes = {
            //'': 'root',
            'projects': 'showProjectsList',
            'logout': 'logOut'
        };

        // The Router handles routing triggered by direct navigation to the URL.
        // It emits UserDidNavigate events (same as those emitted by NavigationCollectionView) in handlers.
        // Views respond appropriately.

        super();
    }
}

export default Router;