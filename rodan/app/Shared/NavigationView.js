import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

class NavigationView extends Backbone.Marionette.CompositeView {
    constructor(options){
        super(options);
    }

    get template() {
        return '#left-sidebar';
    }
}

export default NavigationView;
