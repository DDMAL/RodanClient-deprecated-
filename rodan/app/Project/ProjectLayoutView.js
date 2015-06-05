import Marionette from 'backbone.marionette';
import Events from '../Events';
import Radio from 'backbone.radio';

import ProjectHeaderView from './ProjectHeaderView';
import WorkflowCollectionView from '../Workflow/WorkflowCollectionView';
import ResourceCollectionView from '../Resource/ResourceCollectionView';

import WorkflowCollection from '../Workflow/WorkflowCollection';
import ResourceCollection from '../Resource/ResourceCollection';

/**
 * Project Layout View.
 * @class ProjectLayoutView
 * In onShow(), grabs the project instance attached to the application.
 * When project is loaded, gets its associated workflows.
 */
class ProjectLayoutView extends Marionette.LayoutView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
        this.project = this.appInstance.currentProject;
        this.rodanChannel.on(Events.ProjectDidLoad, () => this.showWorkflows());
        this.rodanChannel.on(Events.ProjectDidLoad, () => this.showResources());
        this.workflowCollection = new WorkflowCollection();
        this.resourceCollection = new ResourceCollection();
    }

    get template()
    {
        return '#project-view';
    }

    regions()
    {
        return {
            'header': '#project-header',
            'workflows': '#project-workflows',
            'resources': '#project-resources'
        };
    }

    onRender()
    {
        this.getRegion('header').show(new ProjectHeaderView({model: this.project}));
        this.getRegion('workflows').show(new WorkflowCollectionView({collection: this.workflowCollection}));
        this.showWorkflows();
        this.getRegion('resources').show(new ResourceCollectionView({collection: this.resourceCollection}));
        this.showResources();
    }

    showWorkflows()
    {
        if (this.project.has('workflows'))
            this.workflowCollection.reset(this.project.get('workflows').toJSON());
    }

    showResources()
    {
        if (this.project.has('resources'))
            this.resourceCollection.reset(this.project.get('resources').toJSON());
    }

    onBeforeDestroy()
    {
        console.log('ProjectLayoutView being destroyed!', this);
    }
}

export default ProjectLayoutView;
