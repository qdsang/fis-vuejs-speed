var node_env = process.env.NODE_ENV;
global.DEBUG = node_env == 'production' ? 0 : 1;


fis.config.merge({

    pages : '',
    statics : '/static',

    // 设置命名空间
    namespace : '',
    // 设置自动刷新页面工具端口号
    livereload : {
         port : 81880
    },

    project : {
        //项目排除掉_xxx.scss，这些属于框架文件，不用关心
        exclude : '**/_*.scss',
        fileType : {
            text : 'jtpl'
        }
    },
    modules : {
        parser : {
            // 关于这个 utc http://learning.github.io/underscore/#template
            //.tmpl后缀的文件使用fis-parser-utc插件编译
            tmpl : ['jade', 'utc'],

            jtpl : 'jade-inline',
            coffee : 'coffee-script',
            less : 'less',
            scss : 'sass',
            sass : 'compass',

            //.jade后缀的文件使用fis-parser-jade插件编译
            // https://github.com/visionmedia/jade/blob/master/Readme_zh-cn.md
            jade : 'jade',

            tpl    : 'bdtmpl-chassis',
            md     : 'marked'
        },
        preprocessor: {
            tpl: 'extlang'
        },
        postprocessor : {
            tpl: 'require-async',
            js : 'jswrapper, require-async'
        },
        optimizer : {
            html: 'html-minifier',
            tpl : 'smarty-xss,html-compress'
        },
        prepackager: 'widget-inline',
        postpackager : function( ret, settings, conf, opt ){

            var map = {
                res : {},
                pkg : {}
            };
            fis.util.map(ret.map.res, function(id, res){
                var r = map.res[id] = {};
                if(res.deps) r.deps = res.deps;
                //有打包的话就不要加url了，以减少map.js的体积
                if(res.pkg) {
                    r.pkg = res.pkg;
                } else {
                    r.url = res.uri;
                }
            });
            fis.util.map(ret.map.pkg, function(id, res){
                var r = map.pkg[id] = {};
                r.url = res.uri;
                if(res.deps) {
                    r.deps = res.deps;
                }
            });
            map.res["vue"].deps = [];
            var mapjson = JSON.stringify(map, null, opt.optimize ? null : 4);

            var htmlContent = '', cssContent = '';

            // 对所有的文件做自定义内置标记替换
            fis.util.map( ret.ids, function( key, value ){
                replace_tags(value);
            } );

            var indexFile = ret.src['/index.jade'];
            if (indexFile) replace_tags(indexFile);
            
            function replace_tags(f){
                var c = f.getContent();
                c = c
                     .replace( /__PAGEHTML__/g, htmlContent )
                     .replace( /__PAGECSS__/g, cssContent )
                     .replace( /__MAP__/g, mapjson )
                     .replace( /__DEBUG__/g, DEBUG );
                
                f.setContent( c );
            }
            
            return true;
        }
    },
    settings : {
        parser : {
            'coffee-script' : {
                //不用coffee-script包装作用域
                bare : true
            },
            jade: {
                pretty : true,
                basedir : fis.project.getProjectPath()
            },
            'jade-inline' : {
                isInlineRuntime : false
            },
            sass : {
                include_paths: []
            }
        },
        postprocessor : {
            jswrapper : {
                type : 'amd'
            }
        },
        spriter : {
            csssprites : {
                //csssprite处理时图片之间的边距，默认是3px
                margin : 20
            }
        },
        optimzier : {
            'png-compressor' : {
                //如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
                //否则png图片透明部分在ie下会显示灰色背景
                //使用spmx release命令时，添加--optimize或-o参数即可生效
                'type' : 'pngquant'
            },
            //config fis-optimizer-uglify-js detail
            'uglify-js' : {
                output : {
                    max_line_len : 500
                }
            },
            //config fis-optimizer-clean-css detail
            'clean-css' : {
                keepBreaks : true
            }
        }
    },
    roadmap : {
        ext : {
            tpl : 'js',
            less : 'css',
            scss : 'css',
            sass : 'css',
            coffee : 'js',
            jade : 'html'
        },
        domain : '',
        path : [
            {
                reg : /\/(.*)\/\_(.*)$/,
                release : false
            },
            {
                //前端模板
                reg : '**.jtpl',
                isJsLike : true,
                //只是内嵌，不用发布
                release : false
            },

            {
                reg : /^\/lib\/(.*)$/i,
                id : 'lib/$1',
                isMod : true,
                release : '${statics}/lib/$1'
            },

            {
                reg : /^\/views\/(.*\.jade)$/,
                useCache : false,
                isViews : true,
                isHtmlLike : true,
                release : '${statics}/views/$1'
            },
            {
                reg : /^\/views\/(.*\.jade)$/,
                useCache : false,
                isViews : true,
                release : '${statics}/views/$1'
            },
            {
                reg : /^\/views\/(.*\.js)$/i,
                id : 'views/$1',
                useCache : false,
                isMod : true,
                release : '${statics}/views/$1'
            },
            {
                reg : /^\/views\/(.*)$/,
                useSprite : true,
                isViews : true,
                release : '${statics}/views/$1'
            },

            {
                reg : /^\/component\/(.*\.jade)$/i,
                useCache : false,
                isHtmlLike : true,
                release : '${statics}/component/$1'
            },
            {
                reg : /^\/component\/(.*)\.(sass|styl|css)$/i,
                id : '$1.css',
                isMod : true,
                useSprite : true,
                useHash : false,
                release : '${statics}/component/$1.$2'
            },
            {
                reg : /^\/component\/(.*)\.js$/i,
                id : '$1',
                isMod : true,
                release : '${statics}/component/$1'
            },
            {
                reg : /^\/component\/(.*)$/i,
                release : '${statics}/component/$1'
            },

            {
                reg : /^\/component_modules\/(.*\.jade)$/i,
                useCache : false,
                isHtmlLike : true,
                release : '${statics}/$1'
            },
            {
                reg : /^\/component_modules\/(.*)\.(styl|css)$/i,
                id : '$1.css',
                isMod : true,
                useSprite : true,
                useHash : false,
                release : '${statics}/$1.$2'
            },
            {
                reg : /^\/component_modules\/mod\/(.*)\.js$/i,
                id : '$1',
                release : '${statics}/mod/$1'
            },
            {
                reg : /^\/component_modules\/(.*)\.js$/i,
                id : '$1',
                isMod : true,
                release : '${statics}/$1'
            },
            {
                reg : /^\/component_modules\/(.*)$/i,
                release : '${statics}/$1'
            },

            {
                reg : /^\/static\/(.*)$/,
                useSprite : true,
                release : '${statics}/$1'
            },

            {
                reg : /^\/pkg\/(.*)$/,
                release : '${statics}/$1'
            },

            {
                reg : /\/(.*)\.(eot|svg|ttf|woff)$/,
                release : '${statics}/$&'
            },
            {
                reg : 'map.json',
                release : false
            },
            {
                reg : '**.jade',
                useCache : false,
                release : '$&'
            },

            {
                reg : '**',
                useHash : false,
                useCompile : false
            }
        ]
    }
});


if(DEBUG == 0) fis.config.merge({
    pack : {
        'pkg/main.js' : [
            'component_modules/insert-css.js',
            'component_modules/cookie.js',
            
            'component_modules/vue.js',
            'component_modules/zepto.js',
            'component_modules/swipe.js',

            'component/model.js',
            'component/header/default.js',
            'component/footer/default.js',
            'component/info/info.js',
            
            'lib/directives/**.js',
            'lib/filters/**.js',
            'lib/main.js',
            'lib/network.js',
            'lib/routes.js',
            'lib/stat.js',
            'lib/app.js',
            'lib/envi.js',

            'views/index/index.js',
            'views/info/notfound.js',
            'views/info/index.js'
        ]
    }
});

fis.config.set('deploy.webfile', {
    receiver : 'http://qd.m.mi.com/webfile/',
    to : '/test1/test/'
});


