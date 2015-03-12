import sinon from 'sinon';
import User from '../../app/User/User';

describe('User Model', function()
{
    beforeEach(function()
    {
        this.jsonresponse = {
                username: "admin",
                first_name: "",
                last_name: "",
                is_superuser: true,
                url: "http://example.com/user/6/",
                is_active: true,
                workflow_runs: [],
                token: "",
                is_staff: true,
                groups: [],
                workflows: [],
                email: "a@a.com",
                projects: []
            };
    });

    it('should construct a User from a JSON reply', function()
    {
        var newuser = new User(this.jsonresponse);
        var username = newuser.get('username');
        expect(username).toBe('admin');
    });

    it('should set the ID attribute to be the URL of the returned object', function()
    {
        var newuser = new User(this.jsonresponse);
        expect(newuser.id).toBe(this.jsonresponse.url);
    });
});