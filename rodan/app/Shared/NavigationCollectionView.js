import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

import Events from '../Events';
import Radio from 'backbone.radio';

import NavigationItemView from './NavigationItemView';

var NavigationCollectionView = Backbone.Marionette.CompositeView.extend
({
    initialize()
    {
        this.rodanChannel = Radio.channel('rodan');
    },

    childView: NavigationItemView,
    template: '#left-sidebar',
    childViewContainer: 'ul',
    events: {
        'click a': 'navigate'
    },

    navigate(event)
    {
        event.preventDefault();
        //store the clicked element's href
        var targetRoute = event.target.attributes[0].value;
        this.rodanChannel.trigger(Events.UserDidNavigate, targetRoute);
        return false;
    }
});

export default NavigationCollectionView;
