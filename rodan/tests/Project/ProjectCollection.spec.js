import sinon from 'sinon';
import Events from '../../app/Events'
import Radio from 'backbone.radio'
import ProjectCollection from '../../app/Project/ProjectCollection'
import ServerController from '../../app/Shared/ServerController'

describe('Project Collection', function()
{
    beforeEach(function()
    {
        this.server = sinon.fakeServer.create();
        this.configuration = {
            rodanServer: 'http://example.com/',
            authenticationType: 'token',               // 'session' or 'token'
            authenticationToken: null
        };

        this.rootResponse = '{"routes":{"taskqueue-config":"http://example.com/taskqueue/config/","connections":"http://example.com/connections/","resultspackages":"http://example.com/resultspackages/","workflowjobs":"http://example.com/workflowjobs/","token-auth":"http://example.com/auth/token/","session-close":"http://example.com/auth/logout/","taskqueue-status":"http://example.com/taskqueue/status/","session-status":"http://example.com/auth/status/","workflowruns":"http://example.com/workflowruns/","resources":"http://example.com/resources/","inputs":"http://example.com/inputs/","jobs":"http://example.com/jobs/","users":"http://example.com/users/","runjobs":"http://example.com/runjobs/","outputs":"http://example.com/outputs/","inputporttypes":"http://example.com/inputporttypes/","session-auth":"http://example.com/auth/session/","inputports":"http://example.com/inputports/","workflows":"http://example.com/workflows/","taskqueue-scheduled":"http://example.com/taskqueue/scheduled/","taskqueue-active":"http://example.com/taskqueue/active/","projects":"http://example.com/projects/","outputporttypes":"http://example.com/outputporttypes/","outputports":"http://example.com/outputports/","resourcetypes":"http://example.com/resourcetypes/"},"configuration":{"page_length":20}}';
        this.server.respondWith("GET", "http://example.com/", [200, { "Content-Type": "application/json"}, this.rootResponse]);
        this.serverController = new ServerController(this.configuration);
        this.server.respond();

        this.rodanChannel = Radio.channel('rodan');
        this.rodanChannel.reply(Events.CurrentApplication, this);

        this.projectCollection = {
                count: 2,
                next: null,
                previous: null,
                current_page: 1,
                total_pages: 1,
                results: [
                    {
                        url: "http://example.com/project/8f292a6e7723475b8462e287ba264f55/",
                        workflow_count: 1,
                        resource_count: 255,
                        creator: {
                            username: "admin"
                        },
                        uuid: "8f292a6e7723475b8462e287ba264f55",
                        name: "test",
                        description: null,
                        created: "2015-03-03T16:26:52.285091Z",
                        updated: "2015-03-03T16:26:52.285146Z"
                    },
                    {
                        url: "http://example.com/project/8dca1bd81cdf4dbbb44c8e43410a22bc/",
                        workflow_count: 1,
                        resource_count: 255,
                        creator: {
                            username: "admin"
                        },
                        uuid: "8dca1bd81cdf4dbbb44c8e43410a22bc",
                        name: "test",
                        description: null,
                        created: "2015-03-03T16:26:52.285091Z",
                        updated: "2015-03-03T16:26:52.285146Z"
                    }
                ]
            };

    });
    
    it('should construct a new project collection from a paged JSON response', function(done)
    {
        var spy = sinon.spy();
        var newProjectCollection = new ProjectCollection();

        this.server.respondWith("GET", "http://example.com/projects/", [200, { "Content-Type": "application/json"}, JSON.stringify(this.projectCollection)]);
        newProjectCollection.fetch();

        newProjectCollection.on('add', function(changed) {
            spy(changed.attributes.name);
            expect(spy.calledWithExactly('test')).toBe(true);
            done();
        });

        this.server.respond();
    });

    afterEach(function()
    {
        this.server.restore();
    });
});