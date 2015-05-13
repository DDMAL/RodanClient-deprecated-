import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

class AppLayoutView extends Backbone.Marionette.LayoutView {
    constructor(options){
        super(options);
    //    //the following goes in initialize instead of constructor?
    }

    get el() {
        return '#app';
    }

    get template() {
        return '#app-layout-view';
    }

    regions() {
        return {
            menu: '#menu',
            content: '#content'
        };
    }
}

export default AppLayoutView;