import Backbone from 'backbone';
import Radio from 'backbone.radio';
import NavigationItem from './NavigationItem'
import Events from '../Events';

class NavigationCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.rodanChannel = Radio.channel('rodan');
        this.model = NavigationItem;

        super(options);
    }
}

export default NavigationCollection;