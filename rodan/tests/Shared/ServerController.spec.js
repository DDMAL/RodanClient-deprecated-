import sinon from 'sinon';
import Backbone from 'backbone';
import ServerController from '../../app/Shared/ServerController';

class Episode extends Backbone.Model
{
    constructor(options)
    {
        super(options);
        this.url = '/episode/' + this.id;
    }
}

describe('Server Controller', function()
{
    beforeEach(function()
    {
        this.server = sinon.fakeServer.create();
    });

    it('should do something', function()
    {
        var callback = sinon.spy();
        this.server.respondWith('GET', '/episode/123', [200, {"Content-Type": "application/json"}, '{"id":123,"title":"Hollywood - Part 2"}']);

        var episode = new Episode({id: 123});
        episode.bind('change', callback);
        episode.fetch();
        this.server.respond();
        expect(callback.getCall(0).args[0].attributes)
            .toEqual({
                id: 123,
                title: 'Hollywood - Part 2'
            });
    });

    afterEach(function()
    {
        this.server.restore();
    });
})