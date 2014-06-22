

function pv(options) {

    options = options || {};

    var pageURL = location.href;
    if (pageURL[0] != '/' ) {
        pageURL = pageURL.substr(pageURL.indexOf('/', 9));
    }
    if (window._hmt) {
        _hmt.push(['_trackPageview', pageURL]);
    }

    if (window._msq) {
        _msq.push(['trackPageView']);
    }
}


function tap(options){
    
    options = options || {};
    var logs = options.logs || [];

    if (window._hmt) {
        _hmt.push(['_trackEvent', 'M站', 'M站'+logs.join('-')]);
    }
    
    if (window._msq) {
        _msq.push(['trackEvent', 'event', 'HM', ''+logs.join('-'), '']);
    }
}

module.exports = {
    pv: pv,
    tap : tap
};