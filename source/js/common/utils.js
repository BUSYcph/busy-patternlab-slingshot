/**
 * forEach for a NodeList ect.
 */

const forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]); // passes back stuff we need
    }
};

export { forEach }
    