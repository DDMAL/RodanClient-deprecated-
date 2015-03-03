import $ from 'jquery';
//import Backbone from 'backbone';
import RodanClient from './app';

$(() => {
    'use strict';
    var rodanApp = new RodanClient();
    rodanApp.start();
});

