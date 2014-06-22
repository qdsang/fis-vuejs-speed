
var ua = navigator.userAgent;

// weixin iphone
//ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_3 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B329 MicroMessenger/5.0.1';


var os = {}, browser = {};

os.android = /android/i.test(ua);

var weixinVersion = ua.match(/MicroMessenger\/(\d)/);
browser.weixin = weixinVersion ? parseInt(weixinVersion[1])||0 : 0;



module.exports = {
    os: os,
    browser: browser
};