
var Vue = require('vue');
var info = require('views/info/index.js');

info.data.btn_type = 'refresh';
info.data.tip_text = '该商品已经下架';

module.exports = Vue.extend(info);