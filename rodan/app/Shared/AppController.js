import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Events from '../Events';
import ProjectCollectionView from '../Project/ProjectCollectionView';

class AppController extends Marionette.Object
{
    constructor()
    {
        // AppController listens to the radio (UserDidNavigate) and tells AppLayoutView (directly) to
        // do things (i.e. switch views).
        // AppController keeps track of state.

        this.rodanChannel = Radio.channel('rodan');
        this.appInstance = this.rodanChannel.request(Events.CurrentApplication);
        this.rodanChannel.on(Events.UserDidNavigate, this.navigateToRoute);
    }

    root()
    {
        console.log('appcontroller root! what do we even do here');
    }

    showProjectsList()
    {
        // AppLayoutView needs to show a new view instance now.
        this.appInstance.appLayoutView.content.show(new ProjectCollectionView());
        console.log('appcontroller showprojectslist!!');
    }

    logOut()
    {
        console.log('appcontroller logout!');
    }

}

export default AppController;