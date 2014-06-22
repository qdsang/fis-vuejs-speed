var Vue = require('vue');

// 数据分组输出
Vue.filter('group', function (arr, length) {
    if (!arr) return [];

    var newArr = [];
    length = parseInt(length, 10);

    for (var i = 0, len = arr.length; i < len; i+= length) {
        newArr.push(arr.slice(i, i+length));
    }
    return newArr;
});
