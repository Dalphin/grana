var _s = null;
$(document).ready(function () {
    try {
        //_s = require("underscore.string");
    }
    catch (e) { }
});

// check the underscore.js link
if (_) {
    // load underscore string to underscore base
    // avoid mix in beause it overwrites include, contains, reverse and join
    //_.mixin(_s.exports());

    // check whether the object is "void" ("", {}, null, undefined or [])
    _.isVoid = function (obj) {
        if (_.isNull(obj) || _.isUndefined(obj)) return true;
        if (_.isNumber(obj) || _.isBoolean(obj)) return false;
        if (_.isString(obj) && obj === "") return true;
        if (_.isEmpty(obj)) return true;

        return false;
    };

    _.try1 = function (f, defaultResult, parameters) {
        if (_.isFunction(f)) {
            try {
                if (_.isUndefined(defaultResult)) defaultResult = null;
                return f(parameters);
            }
            catch (e) {
                console.log(e.message);
            }
        }

        return defaultResult;
    }
}