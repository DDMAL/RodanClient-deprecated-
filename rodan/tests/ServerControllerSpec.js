'use strict';

import ServerController from '../app/Shared/ServerController';

describe('server controller test suite', function()
{
    describe('stuff', function() {
        it('should construct', function() {
            var sc = new ServerController();
            expect(sc).to.not.be.undefined;
        });
    })
});