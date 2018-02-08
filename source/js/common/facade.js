import mediator from './mediator';

// we just need a simple stupid object to act as our facade
const facade = {};
    
// install mediator to our facade
mediator.installTo(facade);

export default facade;