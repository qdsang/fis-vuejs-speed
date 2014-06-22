
var Vue = require('vue');
var info = require('views/info/index.js');

info.data.btn_type = 'gohome';
info.data.tip_text = '网络连接超时，请稍后重试!';

module.exports = Vue.extend(info);