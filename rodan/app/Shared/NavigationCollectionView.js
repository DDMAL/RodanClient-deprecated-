import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

import NavigationItemView from './NavigationItemView'

var NavigationCollectionView = Backbone.Marionette.CompositeView.extend({
    childView: NavigationItemView,
    template: '#left-sidebar',
    childViewContainer: 'ul'
});

export default NavigationCollectionView;
