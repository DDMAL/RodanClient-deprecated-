import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

//class LoginView extends Backbone.View {
class LoginView extends Backbone.Marionette.ItemView {
    constructor(options) {
        super(options);

        //this.setElement(document.getElementById('app'));
        //this.template = _.template(document.getElementById('login-form').innerHTML);
        this.template = '#login-form';
        this.rodanChannel = Radio.channel('rodan');
    }

    events() {
        return {
            'click #login-btn': 'loginAttempt'
        };
    }

    onShow() {
        console.log('Loginview shown!');
    }

    loginAttempt() {
        //@TODO form validation!
        var username = this.$('input[name="username"]').val();
        var password = this.$('input[name="password"]').val();
        this.rodanChannel.trigger(Events.AuthenticationAttempt, {'user': username, 'pass': password});
        //appInstance.AuthenticationController.login(username, password);
    }

}

export default LoginView;