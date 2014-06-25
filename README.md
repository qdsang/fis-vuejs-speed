# fis-vuejs-speed
> 结合fis与vuejs，打造的webapp前端工程解决方案。细颗粒度模块化开发，生成环境工程化自动优化。

> 可能具备功能包括：压缩、校验、打包、md5戳、加域名、csssprite、文件监听、自动刷新、测试、发布目录、自动上传、内置服务器、数据模拟、请求模拟、获取组件、资源定位、资源内嵌、依赖声明、模块化规范、模块化框架、模块化规范、静态资源表、后端模块化、前端模块化、组件化规范、组件仓库、组件生态、插件扩展、构建流程、coffee|less|stylus|sass编译、与ci集成、roadmap.path配置、部署规范、fis包装定制。。。。

## 开发环境
* 使用了fis做为集成解决方案
  * fis项目仓库： https://github.com/fex-team/fis
  * fis wiki: https://github.com/fex-team/fis/wiki
* 安装方法
  * 命令行进入scripts目录，内有install.sh脚本，建议带上sudo执行
  
  ```
  sudo sh ./scripts/install.sh
  ```
  
* 使用方法
  * 直接在项目文件根目录下执行build.sh文件即可进入开发模式
  
  ```
  sh ./build.sh
  ```
  
    * build.sh 分两种模式 
      * dev 开发模式(默认)
        * 代码将发布到 ./output 目录
        * 监听代码目录的变化自动生成新文件
        * html页面代码中插入livereload代码，自动刷新页面方便开发
      * pro 生成模式
        * 代码将发布到 ./release 目录
        * 开启合并文件
        * 自动压缩文件
        * domain域名补全等等优化
        
  ```
  sh ./build.sh dev
  sh ./build.sh pro
  ```

## 安装本地server

* 进入 server目录 直接 npm install 命令即可安装成功
* 直接在server目录中，npm start 即可开启server
* server会直接读取output目录中的静态文件，所以在预览之前先build dev下
* 浏览器中访问 http://127.0.0.1:3000 即可看到效果
* 由于是工程项目，没有搭建直接可以预览的demo页面，没有意义。你值得去动手


## 目录代码介绍

* app 存放完整前端代码
  * component_modules 外部框架类库等等外部引用的
  * component 存放项目中使用的小插件，必须是比较成型的小功能块
  * static 存放与业务逻辑没有关系的零碎文件
  * views 存放页面相关文件
  * fis-conf.js 项目fis配置文件
  * index.jade 项目入口页
* data 本地数据文件
* output 存放开发时生产的代码
* scripts 目录存放fis环境相关文件（与代码没有关系）
* server 本地服务以及代理文件
* svg fonticon 制作备份
* test 测试文件夹
