import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

import Events from '../Events';
import Radio from 'backbone.radio';

class LoginView extends Backbone.Marionette.ItemView
{
    constructor(options)
    {
        super(options);

        this.template = '#login-form';
        this.rodanChannel = Radio.channel('rodan');
    }

    events()
    {
        return {
            'click #login-btn': 'loginAttempt',
            'keyup input[name="password"]': 'onKeyUp'
        };
    }

    loginAttempt()
    {
        //@TODO form validation!
        var username = this.$('input[name="username"]').val();
        var password = this.$('input[name="password"]').val();
        this.rodanChannel.trigger(Events.AuthenticationAttempt, {'user': username, 'pass': password});
        //appInstance.AuthenticationController.login(username, password);
    }

    onKeyUp(ev)
    {
        var key = ev.keyCode || ev.which;

        if (key == 13 && $('input[name="password"]').val()) {
            ev.preventDefault();
            this.loginAttempt();
            return false;
        }
    }

}

export default LoginView;