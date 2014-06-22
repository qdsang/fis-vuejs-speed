#!/bin/bash

# 按照fis环境

echo "开始按照fis环境"
echo "请先确保已经按照node, 并且有权限（sudo sh install.sh）"
echo "如果 npm 安装缓慢 可以使用国内镜像"
echo "      参考地址: http://cbyun.com/"
echo ''

command_exists () {
    type "$1" &> /dev/null ;
}

if !(command_exists node;) then
    echo '还没有安装 node ~！'
    echo 'http://nodejs.org/'
    exit
fi
if !(command_exists npm;) then
    echo '检查到已经安装了node，但是没有npm，请检查node是不是版本太低了？升级试试'
    echo 'http://nodejs.org/'
    exit
fi

echo '开始安装fis'
installs=("fis")

installs+=("fis-parser-coffee-script")
installs+=("fis-parser-jade")
installs+=("fis-parser-less")
installs+=("fis-parser-sass")
installs+=("fis-parser-compass")
installs+=("fis-parser-utc")

installs+=("fis-postpackager-modjs")
installs+=("fis-postpackager-seajs")

installs+=("fis-preprocessor-extlang")

installs+=("fis-postprocessor-require-async")
installs+=("fis-postprocessor-jswrapper")

installs+=("fis-optimizer-html-minifier")
installs+=("fis-optimizer-html-compress")
installs+=("fis-optimizer-smarty-xss")

installs+=("fis-prepackager-widget-inline")
installs+=("fis-prepackager-js-i18n")


for command in "${installs[@]}"
do
    npm install -g ${command}
    echo
done

echo "ok ~!"
