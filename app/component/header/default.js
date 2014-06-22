require('insert-css')(__inline('./css/default.sass'));
var Vue = require('vue');
var app = require('lib/app.js');

module.exports = Vue.component("c-header", {
    className: 'header',
    template: __inline('./default.jade'),
    data: {
        
    },
    created: function(){
        var self = this;
        if (app.isApp()) {
            self.$watch('title', function(){
                var title = self.$data.title || '';
                if (title) app.trigger('showtitlebar', title);
            });
        }
    },
    ready: function(){
        var self = this;
        
        if (self.isHome == undefined) {
            self.isHome = false;
        }
        
        if (app.isApp()) {
            var title = self.$data.title || '';
            app.trigger('bottomstyle','none');
            if (title) app.trigger('showtitlebar', title);
            if (self.$el) self.$el.style.display = 'none';
        }
    }
});