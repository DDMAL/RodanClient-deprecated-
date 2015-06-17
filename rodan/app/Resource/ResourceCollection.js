import Backbone from 'backbone';
import Resource from './Resource';

class ResourceCollection extends Backbone.Collection
{
    constructor(options)
    {
        this.model = Resource;

        super(options);
    }
}

export default ResourceCollection;