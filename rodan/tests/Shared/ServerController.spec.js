import sinon from 'sinon';
import Backbone from 'backbone';
import ServerController from '../../app/Shared/ServerController';

describe('Server Controller', function()
{
    beforeEach(function()
    {
        this.server = sinon.fakeServer.create();

        this.configuration = {
            rodanServer: 'http://example.com/',
            authenticationType: 'session',               // 'session' or 'token'
            authenticationToken: null
        };

        this.rootResponse = '{"routes":{"taskqueue-config":"http://example.com/taskqueue/config/","connections":"http://example.com/connections/","resultspackages":"http://example.com/resultspackages/","workflowjobs":"http://example.com/workflowjobs/","token-auth":"http://example.com/auth/token/","session-close":"http://example.com/auth/logout/","taskqueue-status":"http://example.com/taskqueue/status/","session-status":"http://example.com/auth/status/","workflowruns":"http://example.com/workflowruns/","resources":"http://example.com/resources/","inputs":"http://example.com/inputs/","jobs":"http://example.com/jobs/","users":"http://example.com/users/","runjobs":"http://example.com/runjobs/","outputs":"http://example.com/outputs/","inputporttypes":"http://example.com/inputporttypes/","session-auth":"http://example.com/auth/session/","inputports":"http://example.com/inputports/","workflows":"http://example.com/workflows/","taskqueue-scheduled":"http://example.com/taskqueue/scheduled/","taskqueue-active":"http://example.com/taskqueue/active/","projects":"http://example.com/projects/","outputporttypes":"http://example.com/outputporttypes/","outputports":"http://example.com/outputports/","resourcetypes":"http://example.com/resourcetypes/"},"configuration":{"page_length":20}}';
    });

    it('should get routes from the server', function()
    {
        this.serverController = new ServerController(this.configuration);
        this.server.respondWith("GET", "http://example.com/", [200, { "Content-Type": "application/json"}, this.rootResponse]);
        this.server.respond();

        expect(this.serverController.routes).not.toBeNull();
    });

    it('should return the proper authentication route for session auth', function()
    {
        this.serverController = new ServerController(this.configuration);
        this.server.respondWith("GET", "http://example.com/", [200, { "Content-Type": "application/json"}, this.rootResponse]);
        this.server.respond();
        expect(this.serverController.authenticationRoute).toBe("http://example.com/auth/session/");
    });

    it('should return the proper authentication route for token auth', function()
    {
        this.configuration.authenticationType = "token";
        this.serverController = new ServerController(this.configuration);
        this.server.respondWith("GET", "http://example.com/", [200, { "Content-Type": "application/json"}, this.rootResponse]);
        this.server.respond();
        expect(this.serverController.authenticationRoute).toBe("http://example.com/auth/token/");
    });

    it('should return the correct route for a route name', function()
    {
        this.serverController = new ServerController(this.configuration);
        this.server.respondWith("GET", "http://example.com/", [200, { "Content-Type": "application/json"}, this.rootResponse]);
        this.server.respond();
        expect(this.serverController.routeForRouteName('projects')).toBe('http://example.com/projects/');
    })

    afterEach(function()
    {
        this.server.restore();
    });
})