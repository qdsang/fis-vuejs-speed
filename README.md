# m站前端项目

## 开发环境
* 使用了fis做为集成解决方案
  * fis项目仓库： https://github.com/fis-dev/fis
  * fis wiki: https://github.com/fis-dev/fis/wiki
* 安装方法
  * 命令行进入scripts目录，内有install.sh脚本，建议带上sudo执行
  
  ```
  sudo sh ./scripts/install.sh
  ```
  
* 使用方法
  * 直接在项目文件根目录下执行build.sh文件即可进入开发模式
  
  ```
  sudo sh ./build.sh
  ```
  
    * build.sh 分两种模式
      * dev 开发模式(默认)
        * 监听代码目录的变化自动生成新文件
        * html页面代码中插入livereload代码，自动刷新页面方便开发
      * pro 生成模式
        * 开启合并文件
        * 自动压缩文件
        * domain域名补全等等优化
        
  ```
  sudo sh ./build.sh dev
  sudo sh ./build.sh pro
  ```
  
## 目录代码介绍

* app 存放完整前端代码
  * component_modules 外部框架类库等等外部引用的
  * static 存放与业务逻辑没有关系的零碎文件
  * views 存放页面相关文件
  * component 存放项目中使用的小插件，必须是比较成型的小功能块
  * fis-conf.js 项目fis配置文件
  * index.jade 项目入口页
* data 本地数据文件
* scripts 目录存放fis环境相关文件（与代码没有关系）
* server 本地服务以及代理文件
* svg fonticon 制作备份
* test 测试文件夹
