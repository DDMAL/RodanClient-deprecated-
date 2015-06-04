import Marionette from 'backbone.marionette';
import ProjectListItemView from './ProjectListItemView';

import Radio from 'backbone.radio';
import Events from '../Events';

class ProjectCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }

    get childView()
    {
        return ProjectListItemView;
    }

    get template()
    {
        return '#project-table-view';
    }

    get childViewContainer()
    {
        return 'tbody';
    }

    get childEvents()
    {
        return {
            'ProjectSelected': 'goToProject'
        };
    }

    goToProject(itemView, projectID)
    {
        this.rodanChannel.trigger(Events.UserDidNavigate, 'projectDetail', projectID);
    }
}

export default ProjectCollectionView;
