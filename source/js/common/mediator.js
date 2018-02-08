// mediator
// -------------------------
// The mediator pattern is best introduced with a simple analogy - think of your typical airport traffic control.
// The tower handles what planes can take off and land because all communications are done from the planes to the
// control tower, rather than from plane-to-plane. A centralized controller is key to the success of this system
// and that's really what a mediator is.

// http://addyosmani.com/largescalejavascript/#mediatorpattern

class Mediator {
    constructor(opts) {
        this.isPaused = false;
        this.queue = [];

        this.resume = this.resume.bind(this);
    }

    /**
     * anything that consumes this mediator should have the ability to subscribe
     * to something through a certain channel
     *
     * @api public
     */
    subscribe (channel, fn, context) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }

        this.channels[channel].push({ context: context || this, callback: fn });

        return this;
    }

    /**
     * anything that consumes this mediator should have the ability to unsubscribe
     * from existing subscriptions
     *
     * @api public
     */

    unsubscribe (channel, fn, context) {
        if (!this.channels[channel]) {
            return;
        }

        if (fn) {
            for (var i = 0, l = this.channels[channel].length; i < l; i++) {
                if (this.channels[channel][i].context === context || this &&
                    this.channels[channel][i].callback === fn) {
                    this.channels[channel].splice(i, 1);
                }
            }
        } else {
            delete this.channels[channel];
        }

        return this;
    };

    /**
     * Well.... duh
     */

    pause () {
        this.isPaused = true;
    };

    /**
     * when resumed we will process the queue
     */
    resume () {
        this.isPaused = false;

        for (var i = 0; i < this.queue.length; i++) {
            publish.apply(publish, this.queue[i]);
        }

        this.queue = [];
    }

    /**
     * anything that consumes this mediator should have the ability to publish
     * to a certain channel
     *
     * @api public
     */

    publish (channel) {
        // if we're paused we won't publish, but rather add to the queue
        if (this.isPaused) {
            this.queue.push(Array.prototype.slice.apply(arguments));
            return;
        }

        // we can't publish to a channel that doesn't exist
        if (!this.channels[channel]) {
            return false;
        }

        // handle any arguments passed along
        var args = Array.prototype.slice.call(arguments, 1);

        // and publish to all subscribers
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    }

    installTo (component) {
        component.channels = {},
        component.subscribe = this.subscribe;
        component.unsubscribe = this.unsubscribe;
        component.publish = this.publish;
        component.pubsub = {
            pause: this.pause,
            resume: this.resume
        };
    }
}

module.exports = new Mediator();