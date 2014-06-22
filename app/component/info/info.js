require('insert-css')(__inline('./css/info.sass'));

var Vue = require('vue');

var timer, timerTimeout, timerNow,
    defaultContainer = document.body.querySelector("#info");

module.exports = new Vue({
    template: __inline('info.jade'),
    data: {
        startTime: 0,
        nowTime: 0
    },
    computed: {
        waitTime: function(){
            var self = this,
                nowTime = self.$data.nowTime || 0,
                startTime = self.$data.startTime || 0;
            if (!nowTime) return 0;
            return parseInt((nowTime - startTime)/1000);
        }
    },
    methods: {
        onError: function() {
            location.reload(!0);
        },
        show: function(type) {
            var self = this;
            self.$data.type = type;
            self.container = self.container || defaultContainer;

            if (!self.$el.parentNode) {

                clearTimeout(timer);
                clearTimeout(timerTimeout);

                timer = setTimeout(function() {
                    self.container.appendChild(self.$el);

                    var loadingAnim = $('.global-loading-anim', self.$el);
                    if (Spinner && loadingAnim.length && !loadingAnim.data('isSpin')) {
                        loadingAnim.data('isSpin', true);
                        new Spinner().spin(loadingAnim[0]);
                    }

                }, 100);

                self.$data.timeout = false;
                self.$data.startTime = +new Date;

                timerTimeout = setTimeout(function(){
                    self.$data.timeout = true;
                    self.startNowTime();
                }, 20 * 1000);
            }
        },
        hide: function(type) {
            var self = this;

            clearTimeout(timer);
            clearTimeout(timerTimeout);
            clearInterval(timerNow);

            self.container = self.container || defaultContainer;
            if (self.$data.type === type && self.$el.parentNode) {
                self.container.removeChild(self.$el);
            }

            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 100)
        },
        refresh: function(){
            location.reload(true);
        },
        startNowTime: function(){
            var self = this;
            self.$data.nowTime = +new Date;

            clearInterval(timerNow);
            timerNow = setInterval(function(){
                self.$data.nowTime = +new Date;
            }, 1000);
        }
    }
});