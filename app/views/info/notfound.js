
var Vue = require('vue');
var info = require('views/info/index.js');

info.data.type = 'nofound';
info.data.btn_type = 'gohome';
info.data.tip_text = '页面不存在';

module.exports = Vue.extend(info);