require('insert-css')(__inline('./css/index.sass'));
var Vue = require('vue');
var network = require('lib/network.js');
var info = require('info/info');



module.exports = Vue.extend({
    id: "home",
    attributes: {
        'data-log' : '首页'
    },
    className: 'page-index',
    template: __inline('index.jade'),
    data: {
        nav: [],
        header: {
            title: '首页'
        }
    },
    ready: function(){
        var self = this;
        info.show('loading');
        network.post('/home/index', function(json){
            var data = json.data || {};
            self.$data.nav = data.nav;
            info.hide('loading');
        });
    },
    methods: {
        golink: function(item) {
            location.href = item.link;
        }
    }
});