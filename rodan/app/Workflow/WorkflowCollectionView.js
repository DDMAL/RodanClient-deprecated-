import Marionette from 'backbone.marionette';
import WorkflowListItemView from './WorkflowListItemView';

import Radio from 'backbone.radio';
import Events from '../Events';

class WorkflowCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }

    get childView()
    {
        return WorkflowListItemView;
    }

    get template()
    {
        return '#workflow-list-view';
    }

    get childViewContainer()
    {
        return 'tbody';
    }

    get childEvents()
    {
        return {
            'WorkflowSelected': 'goToWorkflow'
        };
    }

    collectionEvents()
    {
        return {
            'change': 'render'
        };
    }

    goToWorkflow(itemView, data)
    {
        this.rodanChannel.trigger(Events.UserDidNavigate, 'workflowDetail', data);
    }
}

export default WorkflowCollectionView;
