import Marionette from 'backbone.marionette';
import Events from '../Events';
import Radio from 'backbone.radio';

import NavigationCollectionView from './NavigationCollectionView';
import ProjectCollectionView from '../Project/ProjectCollectionView';
import LoginView from '../User/LoginView';
import ProjectLayoutView from '../Project/ProjectLayoutView';

import Project from '../Project/Project';

class AppLayoutView extends Marionette.LayoutView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
        // AppLayoutView listens to UserDidNavigate events
        // Where necessary, views invoke the router to change the URL (but not trigger its route handlers).

        this.rodanChannel.on(Events.UserMustAuthenticate, () => this.content.show(new LoginView()));
        this.rodanChannel.on(Events.UserDidNavigate, (location, data) => this.changeView(location, data));
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

    changeView(targetView, data)
    {
        //@TODO fire router
        switch (targetView) {
            case 'projects':
                console.log('appLayoutView switched to projects');
                this.getRegion('content').show(new ProjectCollectionView({collection: this.appInstance.projectCollection}));
                break;

            case 'projectDetail':
                this.showProjectDetail(data.projectID, data.projectURL);
                break;

            case 'resourceDetail':
                var resourceURL = data;
                console.log('appLayoutView switched to resourceDetail for rURL:', resourceURL);
                break;

            case 'workflowDetail':
                var workflowURL = data;
                console.log('appLayoutView switched to workflowDetail for wURL:', workflowURL);
                break;

            case 'logout':
                console.log('appLayoutView switched to logout');
                break;

            default:
                console.log('Error: appLayoutView cannot find destination view', targetView);
        }
    }

    showProjectDetail(projectID, projectURL)
    {
        console.log('appLayoutView switched to projectdetail for pid', projectID);

        if (this.appInstance.currentProject.id !== projectID)
        {
            console.log('currentProject changed: old, new:', this.appInstance.currentProject.id, projectID);
            //@TODO unsubscribe old handlers on ProjectLayoutView.onBeforeDestroy (or ProjectDidChange event?)
            this.appInstance.currentProject = new Project({
                id: projectID
            });
            var appLayoutView = this;
            this.appInstance.currentProject.fetch({
                url: projectURL,
                success()
                {
                    appLayoutView.rodanChannel.trigger(Events.ProjectDidLoad);
                }
            });
        }

        this.getRegion('content').show(new ProjectLayoutView());
    }

}

export default AppLayoutView;