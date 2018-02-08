class SampleComponent {

    // the constructor will always be fed the element on which it has been instantiated
    constructor (el) {
        this.el = el;

        console.log('I am a sample component instantiated by using data-component="sample-component" (which corresponds with the folder /js/components/sample-component) and I am instantiated on the following DOM node:');
        console.log(this.el);
    }
}

module.exports = SampleComponent;