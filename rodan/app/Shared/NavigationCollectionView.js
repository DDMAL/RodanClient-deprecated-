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
        // Send the clicked element's href along with the event
        event.preventDefault();
        var location = event.target.attributes[0].value;
        this.rodanChannel.trigger(Events.UserDidNavigate, location);
        return false;
    }
}

export default NavigationCollectionView;
