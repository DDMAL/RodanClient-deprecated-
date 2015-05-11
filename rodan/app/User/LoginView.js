import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore'

class LoginView extends Backbone.View {
    constructor(options) {
        super(options);

        this.setElement(document.getElementById('app'));
        this.template = _.template(document.getElementById('login-form').innerHTML);
        this.events = {
            'click #submit': 'loginAttempt'
        };
    }

    render() {
        this.$el.html(this.template());
        return this;
    }

    loginAttempt() {
        //@TODO form validation!
        var username = this.$('input[name="username"').value;
        var password = this.$('input[name="password"').value;
        this.authenticationController.login(username, password);
    }

}

export default LoginView;