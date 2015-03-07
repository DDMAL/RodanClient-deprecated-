import Backbone from 'backbone';

class Router extends Backbone.Router
{
    constructor()
    {
        this.routes = {
            '': 'root'
        };

        super();
    }

    root()
    {
        console.log('Root Route');
    }
}

export default Router;