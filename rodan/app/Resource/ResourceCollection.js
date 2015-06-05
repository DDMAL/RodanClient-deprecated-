import Backbone from 'backbone';
import ResourceListItem from './ResourceListItem';

class ResourceCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.model = ResourceListItem;

        super(options);
    }
}

export default ResourceCollection;