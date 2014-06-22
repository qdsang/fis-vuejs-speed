require('insert-css')(__inline('css/index.sass'));

module.exports = {
    className: 'page-info',
    template: __inline('index.jade'),
    data: {
        btn_type: '',
        tip_text: '系统繁忙，请稍后再尝试！'
    },
    methods: {

    },
    ready: function(){
        var self = this;
    }
};
