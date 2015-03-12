import Backbone from 'backbone';
import Radio from 'backbone.radio';

import Events from '../Events';

class User extends Backbone.Model
{
    constructor(data)
    {
        this.idAttribute = 'url';
        super(data);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }
}

export default User;