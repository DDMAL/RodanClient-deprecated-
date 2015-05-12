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

    initialize() {
        this.template = '#app-layout-view';
        this.el = 'body';
        //this.regions = {
        //    menu: '#menu',
        //    content: '#content'
        //};
    }

    //regions(options) {
    //    return {
    //        menu: '#menu',
    //        content: '#content'
    //    };
    //}
}

export default AppLayoutView;