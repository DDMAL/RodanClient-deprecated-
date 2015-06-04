import Marionette from 'backbone.marionette';
import ProjectListItemView from './ProjectListItemView';

class ProjectCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
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
}

export default ProjectCollectionView;
