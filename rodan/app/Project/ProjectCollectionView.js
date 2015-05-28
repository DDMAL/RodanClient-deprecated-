import Marionette from 'backbone.marionette';
import ProjectView from './ProjectView';

class ProjectCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
    }

    get childView()
    {
        return ProjectView;
    }

    get template()
    {
        return '#project-table-view';
    }

    get childViewContainer()
    {
        return 'tbody';
    }
}

export default ProjectCollectionView;
