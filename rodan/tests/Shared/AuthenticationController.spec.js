import sinon from 'sinon';
import ServerController from '../../app/Shared/ServerController';
import AuthenticationController from '../../app/Shared/AuthenticationController';
import Events from '../../app/Events';

describe('Authentication Controller', function()
{
    beforeEach(function()
    {
        this.server = sinon.fakeServer.create();
        this.configuration = {
            rodanServer: 'http://example.com/',
            authenticationType: 'session',               // 'session' or 'token'
            authenticationToken: null
        };
        this.serverController = new ServerController(this.configuration);
        this.rootResponse = '{"routes":{"taskqueue-config":"http://example.com/taskqueue/config/","connections":"http://example.com/connections/","resultspackages":"http://example.com/resultspackages/","workflowjobs":"http://example.com/workflowjobs/","token-auth":"http://example.com/auth/token/","session-close":"http://example.com/auth/logout/","taskqueue-status":"http://example.com/taskqueue/status/","session-status":"http://example.com/auth/status/","workflowruns":"http://example.com/workflowruns/","resources":"http://example.com/resources/","inputs":"http://example.com/inputs/","jobs":"http://example.com/jobs/","users":"http://example.com/users/","runjobs":"http://example.com/runjobs/","outputs":"http://example.com/outputs/","inputporttypes":"http://example.com/inputporttypes/","session-auth":"http://example.com/auth/session/","inputports":"http://example.com/inputports/","workflows":"http://example.com/workflows/","taskqueue-scheduled":"http://example.com/taskqueue/scheduled/","taskqueue-active":"http://example.com/taskqueue/active/","projects":"http://example.com/projects/","outputporttypes":"http://example.com/outputporttypes/","outputports":"http://example.com/outputports/","resourcetypes":"http://example.com/resourcetypes/"},"configuration":{"page_length":20}}';
        this.server.respondWith("GET", "http://example.com/", [200, { "Content-Type": "application/json"}, this.rootResponse]);
        this.server.respond();

        this.authStatusResponse = '{"username":"admin","first_name":"","last_name":"","is_superuser":true,"url":"http://rodan-dev.simssa.ca/user/6/","is_active":true,"workflow_runs":[],"token":"","is_staff":true,"groups":[],"workflows":[],"email":"a@a.com","projects":[]}';
    });

    it('should get the correct logged-in user status for session authentication', function()
    {
        var spy = sinon.spy();
        this.server.respondWith("GET", "http://example.com/auth/status/", [200, {"Content-Type": "application/json"}, this.authStatusResponse]);
        this.authController = new AuthenticationController(this.serverController);
        this.authController.checkAuthenticationStatus();
        this.authController.rodanChannel.on(Events.AuthenticationSuccess, spy);
        this.server.respond();

        expect(this.authController.activeUser).not.toBeNull();
        expect(spy.called).toBe(true);
    });



    it('should trigger Events.UserMustAuthenticate if the user needs to authenticate', function()
    {
        var spy = sinon.spy();

        this.server.respondWith("GET", "http://example.com/auth/status/", [401, {"Content-Type": "application/json"}, ""]);
        this.authController = new AuthenticationController(this.serverController);
        this.authController.checkAuthenticationStatus();
        this.authController.rodanChannel.on(Events.UserMustAuthenticate, spy);
        this.server.respond();

        expect(spy.called).toBe(true);
    });

    it('should trigger Events.UserCannotAuthenticate if the user cannot authenticate', function()
    {
        var spy = sinon.spy();

        this.server.respondWith("GET", "http://example.com/auth/status/", [403, {"Content-Type": "application/json"}, ""]);
        this.authController = new AuthenticationController(this.serverController);
        this.authController.checkAuthenticationStatus();
        this.authController.rodanChannel.on(Events.UserCannotAuthenticate, spy);
        this.server.respond();

        expect(spy.called).toBe(true);
    });

    it('should trigger Events.AuthenticationError if the server responds with a client error', function()
    {
        var spy = sinon.spy();

        this.server.respondWith("GET", "http://example.com/auth/status/", [400, {"Content-Type": "application/json"}, ""]);
        this.authController = new AuthenticationController(this.serverController);
        this.authController.checkAuthenticationStatus();
        this.authController.rodanChannel.on(Events.AuthenticationError, spy);
        this.server.respond();

        expect(spy.called).toBe(true);
    });

    it('should trigger Events.AuthenticationError if the server responds with a server error', function()
    {
        var spy = sinon.spy();

        this.server.respondWith("GET", "http://example.com/auth/status/", [500, {"Content-Type": "application/json"}, ""]);
        this.authController = new AuthenticationController(this.serverController);
        this.authController.checkAuthenticationStatus();
        this.authController.rodanChannel.on(Events.AuthenticationError, spy);
        this.server.respond();

        expect(spy.called).toBe(true);
    });

    afterEach(function()
    {
        this.server.restore();
    });
});