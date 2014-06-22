
var initialPage = 'index';

var routCallback = function(){};

function router(rout, callback){
    if (callback) routCallback = callback;
    else return _rout();
}

function _rout(){
    //var path = location.hash.replace(/^#!\/?/, '') || initialPage;

    var param = urlFormat(getHash()), path = param.ac + '/' + param.op;
    var page = path;//routes.indexOf(path) > -1 ? path : 'info/notfound';
    
    routCallback(page, param);

    return page;
}



function getHash(a) {
    return a = a || location.href, a.replace(/^[^#]*#?\/?(.*)\/?$/, "$1")
}

function urlFormat(hash){
    if (hash[0] == '#') hash = hash.substr(1);
    
    var urls = hash.split('?'),
    // 如果是ac=开头的判定为旧格式
        isold = hash.substr(0, 3) == 'ac=',
        paths = (urls[0] || ''), params = (urls[1] || ''), param = {};

    if (isold) {
        paths = '';
        params = hash;
    }

    if (params) {
        params = params.split('&');
        for (var i = 0; i < params.length; i++) {
            var ret = params[i].split('=');
            param[ret[0]] = ret[1];
        }
    }
    if (paths) {
        if (paths[0] == '/') paths = paths.substr(1);
        if (paths[paths.length - 1] == '/') paths = paths.substr(0, paths.length - 1);

        paths = paths ? paths.split('/') : [];
        if (paths[0]) param.ac = paths[0];
        if (paths[1]) param.op = paths[1];
        param.paths = paths;
    }

    param.ac = param.ac || 'index';
    param.op = param.op || 'index';

    return param;
}



window.addEventListener('hashchange', function () {
    _rout();
});

module.exports = router;