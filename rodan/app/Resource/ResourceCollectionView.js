import Marionette from 'backbone.marionette';
import ResourceListItemView from './ResourceListItemView';

import Radio from 'backbone.radio';
import Events from '../Events';

class ResourceCollectionView extends Marionette.CompositeView
{
    constructor(options)
    {
        super(options);
        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
    }

    get childView()
    {
        return ResourceListItemView;
    }

    get template()
    {
        return '#resource-list-view';
    }

    get childViewContainer()
    {
        return 'tbody';
    }

    get childEvents()
    {
        return {
            'ResourceSelected': 'goToResource'
        };
    }

    collectionEvents()
    {
        return {
            'change': 'render'
        };
    }

    goToResource(itemView, resourceURL)
    {
        this.rodanChannel.trigger(Events.UserDidNavigate, 'resourceDetail', resourceURL);
    }
}

export default ResourceCollectionView;
