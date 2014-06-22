var $ = require('zepto');
var envi = require('lib/envi.js');
var cookie = require('cookie');

var app_path = (window.debug || location.href.indexOf('debug') != -1) ?
            '/api' : '/api';

var client_id = '1';

// 用于加载页面数据， 默认具备缓存机制
var load = function(option, done){

    if (option.url && !option.result) {
        post({url: option.url, param: option.param}, function(resp){

            option.result = (option.filter) ? option.filter(resp) : resp;
            
            done(option);
        });
    }else {
        option.data = option.data || {};
        done(option);
    }

};

var post = function(url, param, done){
    var option = {};
    if ($.isObject(url)) {
        option = url;
        url = option.url;
        param = option.param;
    }else {
        if ($.isFunction(param)){
            done = param;
            param = {};
        }
    }

    var domain = option.app_path || app_path,
        success = option.success,
        error = option.error,
        cache = option.cache || '',
        // 默认进行登录
        isLogin = option.islogin == false ? false : true;

    success = success || function(){};
    error = error || function(){
        
    };
    done = done || function(){};

    var ajaxOption = {
        type: 'POST',
        url: domain + url,
        data: $.extend({ client_id: client_id }, param),
        dataType: 'json',
        timeout: option.timeout || 7000,
        success: function(resp) {
            if(resp && resp.result == 'ok') {
                success(resp);
            } else if(resp && resp.reason && resp.reason.indexOf('access_token') >= 0) {
                if (isLogin) {
                    
                }
            }
            done(resp);
        },
        error: function(ex) {
            error();
            if(done) {
                done(ex);
            } else {

            }
        }
    };

    return $.ajax(ajaxOption);
};

module.exports = {
    post: post,
    jsonp: $.ajaxJSONP,
    config: {
        app_path: app_path,
        client_id: client_id
    }
};