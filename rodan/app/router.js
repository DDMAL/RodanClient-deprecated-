import Backbone from 'backbone';

class RodanRouter extends Backbone.Router
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

export default RodanRouter;