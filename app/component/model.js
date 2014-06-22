
var model = {};

module.exports = function(key){
    var ret = model;

    if (key) {
        if (!model[key]) model[key] = {};
        ret = model[key];
    }

    return ret;
};