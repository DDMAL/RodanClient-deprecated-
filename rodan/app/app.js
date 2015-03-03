import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

console.log(Marionette);

export class RodanClient extends Marionette.Application
{
    initialize(options)
    {
        console.log('initializing');
    }

    onStart(options)
    {
        console.log('starting');
        if (Backbone.history)
        {
            console.log('starting backbone history');
            Backbone.history.start();
        }
    }
}