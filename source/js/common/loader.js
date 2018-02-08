import facade from './facade';
import ComponentLoader from './componentLoader';
import componentLoaderState from './constants/componentStates';
import { forEach } from './utils';

class Loader {
    constructor(opts) {
        this.loadedMap = [];
        this.dataName = 'data-component';
        this.refCount = {};
    }

    /**
     * Helper function for sorting out component paths based on passed in name
     * will return a path as a string
     */
    componentPath(name) {
        const s = name.lastIndexOf('/');
        if (s !== -1) {
            return name.substring(0, s) + '/components/' + name.substring(s + 1) + '/main';
        } else {
            return 'components/' + name + '/main';
        }
    }

    // when new component starts up, it will register itself in here
    increaseComponent (name) {
        if (this.refCount[name]) { // more of the same?
            this.refCount[name]++;
        } else { // or first of its kind?
            this.refCount[name] = 1;
        }
    }

    // when components needs to be torn down, we'll leave no garbage behind
    decreaseComponent (name) {
        this.refCount[name]--;
    }

    /**
    * Helper for finding a specific component by its element
    */
    findcomponentByEl(el) {
        for (var i = 0; i < this.loadedMap.length; i++) {
            if (this.loadedMap[i].el === el) {
                return this.loadedMap[i];
            }
        }
        return null;
    }

    /**
     * Our pubsub system doesn't do us much good unless every component has finished loading
     * so we'll resume the communication when everything is done loading
     */
    resumePubsubWhenAllLoaded() {
		for (var i = 0; i < this.loadedMap.length; i++) {
			if (this.loadedMap[i].state !== componentLoaderState.STARTED) {
				return;
			}
        }
        
		facade.pubsub.resume();
	}


    init () {
        /**
         * listen for whenever the loader wants to refresh and be ready for bootstrapping of components
         */
        facade.subscribe('loader:refresh', () => {
            var loader,
            component,
            componentList,
            componentArray,
            stopcomponents = this.loadedMap.slice(0);

            var me = this;

            // we want to load new components - for communcation to be trustworthy, we should pause
            // all pubsub until everything has finished loading, so that no messages are lost in the
            // meantime
            facade.pubsub.pause();

            var componentList = document.querySelectorAll('[data-component]');
            forEach(componentList, function (index, componentNode) {
                // existing components should be stopped in their current form, and refreshed in their new one
                if ( ( component = me.findcomponentByEl(componentNode) ) ) {
                    stopcomponents.splice(stopcomponents.indexOf(component), 1);
                    component.refresh();
                } else {
                    // Split space separated componentlist into an array
                    componentArray = componentNode.getAttribute(me.dataName).split(' ');

                    // Loop through array of component names and load new component for each
                    for (var i = 0, len = componentArray.length; i < len; i++) {

                        // spin up a new componentloader for this component
                        loader = new ComponentLoader({
                            el            : componentNode,
                            componentName : componentArray[i]
                        });

                        // start component
                        loader.start();

                        // register the component in our loadedMap
                        me.loadedMap.push(loader);

                    }
                }
            });

            // for components that are obsolete, we should stop them and remove them from our this.loadedMap
            for (var n = 0; n < stopcomponents.length; n++) {
                component = stopcomponents[n];

                component.stop();
                this.loadedMap.splice(this.loadedMap.indexOf(component), 1);
            }
        });
    }
}

const loader = new Loader();

export default loader;