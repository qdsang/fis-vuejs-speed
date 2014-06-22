#!/bin/bash

# 项目代码编译脚本

# 使用方法
# sh build.sh dev ./ ./output

#cd `dirname $0`
echo "   dev 开发模式（默认）"
echo "   pro 生产模式"
echo "eg: sudo sh build.sh dev"

DEPLOY=dev
# 项目根目录
ROOTPATH="./app/"
# 代码输出目录
DEST="../output"
# 配置文件
FIS_CONF="fis-conf.js"

if [ $# -eq 1 ]; then
        DEPLOY=$1
fi
#if [ $# -eq 2 ]; then
#        DEPLOY=$1
#        ROOTPATH=$2
#fi
#if [ $# -eq 3 ]; then
#        DEPLOY=$1
#        ROOTPATH=$2
#        DEST=$3
#fi
#if [ $# -lt = 1 ]; then
#        DEPLOY=dev
#fi

FIS_OPTION=""
FIS="fis"
NODE_ENV="development"

case $DEPLOY in
        dev)
                FIS_OPTION="--watch --clean --live --pack"
        ;;
        test)
                FIS_OPTION="--clean --pack --md5"
        ;;
        pro)
                FIS_OPTION="--clean --optimize --pack --md5 --domains"
                NODE_ENV="production"
                DEST="../../m-mi-com"
        ;;
        debug-fis)
                # 调试fis核心用
                # 结合 " node-inspector & " 使用
                FIS="node --debug-brk /usr/local/bin/fis"
                FIS_OPTION="--watch --clean --live --pack --domains"
                
        ;;
        *)
                echo "这什么参数？ 请输入 dev 或者 pro"
                exit
        ;;
esac

ROOTPATH=$(cd $ROOTPATH; pwd)
cd $ROOTPATH
echo $DEST
DEST=$(cd $DEST; pwd)
echo 
echo "当前项目目录：${ROOTPATH}"
echo "输出目录：${DEST}"
echo 

echo ""
echo "开启 fis 编译 ${DEPLOY}"
FIS_COMMAND="$FIS release $FIS_OPTION --root $ROOTPATH --dest $DEST --file $ROOTPATH/$FIS_CONF"
echo $FIS_COMMAND
NODE_ENV=$NODE_ENV $FIS_COMMAND
echo ""
echo "结束"
