var Vue = require('vue');

var numReg = /^[0-9\.]*$/ig
// 格式化价钱格式
Vue.filter('money', function (str) {

    if (typeof str == 'number') {
        str = parseInt(str*100)/100 + '';
    } else if (typeof str == 'string' && numReg.test(str)){
        str = '' + parseFloat(str);
    }

    str = str || '0';
    
    if (str.indexOf('元') == -1) {
        str += '元';
    }
    return str;
});