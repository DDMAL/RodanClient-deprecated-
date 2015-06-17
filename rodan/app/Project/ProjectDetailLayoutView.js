import Marionette from 'backbone.marionette';
import Events from '../Events';
import Radio from 'backbone.radio';

import WorkflowCollectionView from '../Workflow/WorkflowCollectionView';
import ResourceCollectionView from '../Resource/ResourceCollectionView';
import WorkflowRunCollectionView from '../WorkflowRun/WorkflowRunCollectionView';

import WorkflowCollection from '../Workflow/WorkflowCollection';
import WorkflowRunCollection from '../WorkflowRun/WorkflowRunCollection';
import ResourceCollection from '../Resource/ResourceCollection';

/**
 * Project Detail Layout View.
 * @class ProjectDetailLayoutView
 * In onShow(), grabs the project instance attached to the application.
 * When project is loaded, gets its associated workflows.
 */
class ProjectDetailLayoutView extends Marionette.LayoutView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
        this.project = this.appInstance.currentProject;
        this.rodanChannel.on(Events.ProjectDidLoad, () => this.showWorkflows());
        this.rodanChannel.on(Events.ProjectDidLoad, () => this.showResources());
        this.rodanChannel.on(Events.ProjectDidLoad, () => this.showWorkflowRuns());
        this.workflowCollection = new WorkflowCollection();
        this.workflowRunCollection = new WorkflowRunCollection();
        this.resourceCollection = new ResourceCollection();
    }

    get template()
    {
        return '#project-detail-view';
    }

    regions()
    {
        return {
            'workflows': '#project-workflows',
            'resources': '#project-resources',
            'workflowruns': '#project-workflowruns'
        };
    }

    //events()
    //{
    //    return {
    //        'click #edit-workflows': this.switchToEditMode
    //    };
    //}

    onRender()
    {
        this.getRegion('workflows').show(new WorkflowCollectionView({collection: this.workflowCollection}));
        this.showWorkflows();
        this.getRegion('resources').show(new ResourceCollectionView({collection: this.resourceCollection}));
        this.showResources();
        this.getRegion('workflowruns').show(new WorkflowRunCollectionView({collection: this.workflowRunCollection}));
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

    showWorkflowRuns()
    {
        if (this.project.has('workflowRuns'))
        {
            this.resourceCollection.reset(this.project.get('workflowRuns').toJSON());
        }
        else
        {
            //fetch workflowRuns and attach them to the Project instance
            var workflowRunCollectionURL = this.appInstance.serverController.routeForRouteName('workflowruns') + '?project=' + this.project.id;
            var projectDetailLayoutView = this;
            this.workflowRunCollection.fetch({
                url: workflowRunCollectionURL,
                success(args)
                {
                    console.log('attach the workflowrun collection to the project model', args);
                    projectDetailLayoutView.project.set({workflowRuns: projectDetailLayoutView.workflowRunCollection});
                    // add model with workflowRuns back into the projectCollection
                    projectDetailLayoutView.appInstance.projectCollection.add(projectDetailLayoutView.project, {merge: true});
                }
            });
        }
    }
}

export default ProjectDetailLayoutView;
