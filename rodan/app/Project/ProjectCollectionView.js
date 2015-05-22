import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

import ProjectView from './ProjectView'

var ProjectCollectionView = Marionette.CollectionView.extend({
    childView: ProjectView
});

export default ProjectCollectionView;