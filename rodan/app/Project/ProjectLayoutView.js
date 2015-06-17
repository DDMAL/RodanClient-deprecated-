import Marionette from 'backbone.marionette';
import Events from '../Events';
import Radio from 'backbone.radio';

import ProjectHeaderView from './ProjectHeaderView';
import ProjectDetailLayoutView from './ProjectDetailLayoutView';

import WorkflowDetailLayoutView from '../Workflow/WorkflowDetailLayoutView';
import WorkflowRunDetailLayoutView from '../WorkflowRun/WorkflowRunDetailLayoutView';

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
        this.rodanChannel.on(Events.UserDidNavigate, (location, data) => this.changeView(location, data));
    }

    get template()
    {
        return '#project-view';
    }

    regions()
    {
        return {
            'header': '#project-header',
            'project-detail': '#project-detail'
        };
    }

    onRender()
    {
        this.getRegion('header').show(new ProjectHeaderView({model: this.project}));
        this.getRegion('project-detail').show(new ProjectDetailLayoutView({model: this.project}));
    }

    onBeforeDestroy()
    {
        console.log('ProjectLayoutView being destroyed!', this);
    }

    changeView(targetView, data)
    {
        //@TODO fire router
        switch (targetView) {
            case 'workflowDetail':
                console.log('ProjectLayoutView switched to workflowDetail:', data);
                this.showWorkflowDetail(data.workflowID, data.workflowURL);
                break;

            case 'workflowRunDetail':
                console.log('ProjectLayoutView switched to workflowRunDetail:', data);
                this.showWorkflowRunDetail(data.workflowRunID, data.workflowRunURL);
                break;

            default:
                console.log('ProjectLayoutView: view not found', targetView);
        }
    }

    showWorkflowDetail(workflowID, workflowURL)
    {
        //TODO instantiate appInst.currentWorkflow first
        //TODO use workflowURL as workflow idAttribute
        this.appInstance.currentWorkflow = this.appInstance.currentProject.workflowCollection.get(workflowURL);
        this.getRegion('project-detail').show(new WorkflowDetailLayoutView({model: this.appInstance.currentWorkflow}));
    }

    showWorkflowRunDetail(workflowRunID, workflowRunURL)
    {
        this.getRegion('project-detail').show(new WorkflowRunDetailLayoutView({model: this.appInstance.currentWorkflow}));
    }

    //TODO showResourceDetail
}

export default ProjectLayoutView;
