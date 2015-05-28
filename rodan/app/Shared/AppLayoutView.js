import Marionette from 'backbone.marionette';

import Events from '../Events';
import Radio from 'backbone.radio';

class AppLayoutView extends Marionette.LayoutView
{
    constructor(options)
    {
        super(options);
        // AppLayoutView's methods for switching views will be called by AppController.
        // They will invoke the router to change the URL but not trigger its route handlers.
    }

    get el()
    {
        return '#app';
    }

    get template()
    {
        return '#app-layout-view';
    }

    regions()
    {
        return {
            menu: '#region-menu',
            content: '#region-content',
            status: '#region-status'
        };
    }
}

export default AppLayoutView;