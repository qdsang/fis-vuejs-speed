require('insert-css')(__inline('./css/default.sass'));
var Vue = require('vue');


module.exports = Vue.component("c-footer", {
    className: 'footer',
    template: __inline('./default.jade'),
    data: {
    },
    ready: function(){
        var self = this;
    }
});