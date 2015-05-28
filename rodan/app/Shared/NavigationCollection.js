import Backbone from 'backbone';
import NavigationItem from './NavigationItem';

class NavigationCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.model = NavigationItem;

        super(options);
    }
}

export default NavigationCollection;