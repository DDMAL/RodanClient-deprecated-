import sinon from 'sinon';
import ProjectCollection from '../../app/Project/ProjectCollection';

describe('Project Collection', function()
{
    beforeEach(function()
    {
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
    
    it('should construct a new project collection from a paged JSON response', function()
    {

    });
    
});