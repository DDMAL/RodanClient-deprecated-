import $ from 'jquery';
import RodanClient from './Application';

$(() => {
    'use strict';
    var rodanApp = new RodanClient();
    rodanApp.start();
});
