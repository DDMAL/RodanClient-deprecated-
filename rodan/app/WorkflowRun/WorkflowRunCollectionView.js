import Marionette from 'backbone.marionette';
import WorkflowRunListItemView from './WorkflowRunListItemView';

import Radio from 'backbone.radio';
import Events from '../Events';

class WorkflowRunCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }

    get childView()
    {
        return WorkflowRunListItemView;
    }

    get template()
    {
        return '#workflow-run-list-view';
    }

    get childViewContainer()
    {
        return 'tbody';
    }

    get childEvents()
    {
        return {
            'WorkflowRunSelected': 'goToWorkflowRun'
        };
    }

    collectionEvents()
    {
        return {
            'change': 'render'
        };
    }

    goToWorkflowRun(itemView, data)
    {
        this.rodanChannel.trigger(Events.UserDidNavigate, 'workflowRunDetail', data);
    }
}

export default WorkflowRunCollectionView;
