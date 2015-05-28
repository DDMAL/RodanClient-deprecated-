import Marionette from 'backbone.marionette';

class NavigationItemView extends Marionette.ItemView
{
    get template()
    {
        return '#navigation-item-view';
    }

    get tagName()
    {
        return 'li';
    }
}

export default NavigationItemView;
