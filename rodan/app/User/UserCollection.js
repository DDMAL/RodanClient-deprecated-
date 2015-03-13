import Backbone from 'backbone';
import Radio from 'backbone.radio';
import User from './User';
import Events from '../Events';


class UserCollection extends Backbone.Collection
{
    constructor()
    {
        super();
        this.rodanChannel = Radio.channel('rodan');
        this.model = User;
        var appInstance = this.rodanChannel.request(Events.CurrentApplication);
        this.url = appInstance.serverController.routeForRouteName('users');
        console.log(this.url);
    }
}

export default UserCollection;