import $ from 'jquery';
//import _ from 'underscore';
import Backbone from 'backbone';
Backbone.$ = $;
//Backbone._ = _;
import Marionette from 'backbone.marionette';
//console.log(Marionette);
import { App } from './app';

var x = new App();
x.bar();