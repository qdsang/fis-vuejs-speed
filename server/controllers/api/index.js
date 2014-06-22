/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var httpProxy = require('http-proxy');
//var apiProxy = httpProxy.createProxyServer();
var apiproxy = require('express-apiproxy');
var zlib = require('zlib');

function proxy_data(req, res, next){
    
    // apiproxy will proxy cookie in `req` to target api address
    var request = apiproxy(req),
        header = {},
        opt = {};
    var header_keys = ['Content-Type', 'accept', 'accept-encoding', 'accept-language', 'cookie', 'referer', 'user-agent', 'x-requested-with'];
    for(var i = 0; i < header_keys.length; i++) {
        var key = header_keys[i];
        if (req.headers[key]) header[key] = req.headers[key];
    }
    header['referer'] = '';
    opt['headers'] = header;
    opt.method = 'POST' || req.method;
    opt.url = '' + req.url;
    opt.form = req.body || {};
    opt.form['test'] = opt.form['test'] || '';

    // 为了 zlib.gunzip
    // https://github.com/mikeal/request/issues/747
    opt.encoding = null;
    
    request(opt, function (error, response, body) {
        if(response.headers['content-encoding'] == 'gzip'){
            //console.log(response.headers);
            zlib.gunzip(response.body, function(err, dezipped){
                res.send(dezipped);
            });
        } else {
            res.send(body);
        }
    });
}

function local_data(req, res, next){

    var params = req.params, query = req.query;

    var json = {}, file = 'base.json';
    var dir = '../data/' + req.url.replace('/api/', '') + '/';
    var filepath = dir+file;

    if (fs.existsSync(filepath)) {
        var content = fs.readFileSync(filepath, "utf8");
        json = (new Function("return " + content))();
    }else {
        mkdirsSync(path.dirname(filepath));
        fs.writeFileSync(filepath, '');
    }
    setTimeout(function(){

        res.send(JSON.stringify(json));

    },1000);

}

//创建多层文件夹 同步
function mkdirsSync(dirpath, mode) { 
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}

exports.before = function(req, res, next){

    local_data(req, res, next);

    //proxy_data(req, res, next);
}

exports.index = function(req, res, next){

    return;
};
exports.create = function(req, res, next){
    var ac = req.params.ac;

    res.send('create');
};
