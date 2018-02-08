import componentLoaderState from './constants/componentStates';
import loader from './loader';

/**
 * ComponentLoader constructor.
 *
 * @param {Object} opts:
    - el : DOM element that the component lives inside
    - componentName : Name of the component - translates directly to what's inside [data-component]
* @api public
*/

class ComponentLoader {
    constructor(opts) {
        this.el = opts.el;
        this.componentName = opts.componentName;
        this.state = componentLoaderState.NEW;
    }

    /**
     * When I change my responsibility (when I change [data-component]) I need a way to refresh my body
     *
     * @api public
     */

    refresh () {
        var componentName = this.el.getAttribute(dataName);

        if (componentName !== this.componentName) {
            if (this.state === componentLoaderState.STARTED) {
                this.stop();
            }
            this.componentName = this.el.getAttribute(dataName);

            this.start();
        }
    }

    /**
     * Start me up, load my logic, register me as running an involve me in communication
     *
     * @api public
     */
    
    start () {
        if (this.state === componentLoaderState.STARTING) {
            throw new Error('Error trying to start a component in placeholder where another component is pending start is not possible.');
        }

        this.state = componentLoaderState.STARTING;

        var me = this;

        loader.increaseComponent(this.componentName);

        import('../components/' + this.componentName + '/main').then(ComponentConstructor => {
            new ComponentConstructor(me.el);

            me.state = componentLoaderState.STARTED;

            loader.resumePubsubWhenAllLoaded();
        });
    }

    /**
     * I don't want to play anymore. Stop me, erase me, forget about me and leave no trace!
     *
     * @api public
     */

    stop () {
        this.el.innerHTML = '';
        this.state = componentLoaderState.STOPPED;

        loader.decreaseComponent(this.componentName);
    }
}

export default ComponentLoader;