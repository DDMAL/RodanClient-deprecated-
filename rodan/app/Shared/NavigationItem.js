import Backbone from 'backbone';
import Radio from 'backbone.radio';
import Events from '../Events';

class NavigationItem extends Backbone.Model
{
    constructor(options)
    {
        this.rodanChannel = Radio.channel('rodan');

        super(options);
    }
}

export default NavigationItem;