var Vue = require('vue');
var $ = require('zepto');
var stat = require("lib/stat.js");

var fun = function(event){
    var self = event.target, parentMaxDep = 10, logs = [], log;
    while(self && self.hasAttribute && parentMaxDep--) {
        log = self.getAttribute('data-log')
        if (log) logs.splice(0, 0, log);
        self = self.parentNode;
    }
    
    stat.tap({logs: logs});
}

Vue.directive('log', {
    bind: function (value) {
        $(this.el).bind('tap', fun);
    },
    update: function (value) {
        // do something based on the updated value
        // this will also be called for the initial value
    },
    unbind: function () {
        $(this.el).unbind('tap', fun);
    }
})