import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import Events from '../Events';
import Radio from 'backbone.radio';

var NavigationItemView = Backbone.Marionette.ItemView.extend({
    template: '#navigation-item-view',
    tagName: 'li'
});

export default NavigationItemView;
