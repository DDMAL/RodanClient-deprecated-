import Marionette from 'backbone.marionette';

import Events from '../Events';
import Radio from 'backbone.radio';

import NavigationItemView from './NavigationItemView';

class NavigationCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
    }

    get childView()
    {
        return NavigationItemView;
    }

    get template()
    {
        return '#left-sidebar';
    }

    get childViewContainer()
    {
        return 'ul';
    }

    events()
    {
        return {
            'click a': 'navigate'
        };
    }

    navigate(event)
    {
        event.preventDefault();
        //store the clicked element's href
        var targetRoute = event.target.attributes[0].value;
            this.rodanChannel.trigger(Events.UserDidNavigate, targetRoute);
            return false;
    }
}

export default NavigationCollectionView;
