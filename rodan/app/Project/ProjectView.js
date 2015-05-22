import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

var ProjectView = Marionette.ItemView.extend({
    template: '#project-view'
});

export default ProjectView;
