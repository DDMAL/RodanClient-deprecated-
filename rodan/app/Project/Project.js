import Backbone from 'backbone';

class Project extends Backbone.Model
{
    constructor(data)
    {
        this.idAttribute = 'url';
        super(data);
    }

    initialize(data)
    {
        debugger;
    }

}

export default Project;