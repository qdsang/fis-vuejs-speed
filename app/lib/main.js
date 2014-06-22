var routing = require("lib/routes.js"),
    Vue = require('vue'),
    $ = require('zepto');

var stat = require("lib/stat.js");
var info = require('info/info');

// Vue 插件
require("lib/directives/log.js");
require("lib/filters/group.js");
require("lib/filters/money.js");

// 路由页面
routing('*', function(page, param){

    var asPath = 'views/' + page + '.js';
    if (window.resourceMap && resourceMap.res[asPath]) {

    }else {
        asPath = 'views/info/notfound.js';
    }

    //info.show('loading');

    require.async(asPath, function(pageComponent){
        var components = app.$options.components;

        if (!components[page]) {
            components[page] = pageComponent;
        }
        app.param = param;
        if (app.view == page) {
            //app.$broadcast('route:change', param)
            var appViewChild = app.$compiler.children;
            if (appViewChild.length) {
                appViewChild[0].vm.load && appViewChild[0].vm.load(param);
            }
        }else {
            app.view = page;
        }

        stat.pv();
    });
})

window.app = new Vue({
    el: '#wrapper',
    components: {},
    data: {}
});

// 缓存

require("header/default");
require("footer/default");
require('views/index/index.js');
require('views/info/notfound.js');


// 加载初始页面
var currentPage = routing();
if (app.$options.components[currentPage]) {
    app.view = currentPage;
}

// 删除初始页面的loading
var target = document.getElementById('globalLoading');
if (target && target.parentNode) {
    target.parentNode.removeChild(target);
}