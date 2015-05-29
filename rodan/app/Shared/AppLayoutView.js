import Marionette from 'backbone.marionette';

import Events from '../Events';
import Radio from 'backbone.radio';

import NavigationCollectionView from './NavigationCollectionView';
import ProjectCollectionView from '../Project/ProjectCollectionView';
import LoginView from '../User/LoginView';


class AppLayoutView extends Marionette.LayoutView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
        // AppLayoutView listens to UserDidNavigate events
        // Where necessary, views invoke the router to change the URL (but not trigger its route handlers).

        var instance = this;

        this.rodanChannel.on(Events.UserDidNavigate, (arg) => this.changeView(arg));
        this.rodanChannel.on(Events.UserMustAuthenticate, () => this.content.show(new LoginView()));
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

    onRender()
    {
        // Show the models in appInstance.navigationCollection
        // (Regions automatically update when the collection is changed).
        this.getRegion('menu').show(new NavigationCollectionView({collection: this.appInstance.navigationCollection}));
    }
}

export default AppLayoutView;