# superset

## superset 介绍

* 官方：<https://superset.apache.org/>
* 下载安装，使用 docker 安装： <https://superset.apache.org/docs/installation/installing-superset-using-docker-compose>
* docker hub：<https://registry.hub.docker.com/r/apache/superset>

## 连接其他数据库

创建配置文件 superset_config.py 设置以下内容

```py
SQLALCHEMY_DATABASE_URI = 'mysql://username:password@database_source:3306/dabtabase'
```

## docker部署

```bash
superset fab create-admin \
    --username admin \
    --firstname xxx \
    --lastname xxx \
    --email admin@superset.com \
    --password xxxx

superset db upgrade

superset load_examples

superset init
```

## 支持的数据和图表

## 二次开发

### 目录结构与框架

* superset-frontend 前端页面展示
  用到的技术：react + antd + immutable + d3

### 本地启动

#### 本地安装

以下为mac环境

1. 确保安装了xcode，如没有安装，请先安装或者执行命令 ```xcode-select --install```
2. 安装homebrew，设置国内镜像，如何安装，如何设置，网上随便一搜便搞定，这里不啰嗦
3. ```brew update``` ```brew upgrade```，更新 brew 以及brew已安装的软件（如不想更新，请忽略）
4. 安装必备软件 ```brew install readline pkg-config libffi openssl mysql postgres```
5. 使用[pyenv](https://github.com/pyenv/pyenv)管理Python，详细说明参见[这里](./python)
6. 安装 setuptools ```pip install --upgrade setuptools pip```
7. 设置某些 Python 环境变量

   ```shell
   export LDFLAGS="-L$(brew --prefix openssl)/lib"
   export CFLAGS="-I$(brew --prefix openssl)/include"
   ```

8. 安装 Python 虚拟机，如安装失败，可以重启终端试试或使用镜像安装

   ```shell
     pip install virtualenv
   ```

   ```shell
     pip install -i https://mirrors.aliyun.com/pypi/simple/ virtualenv
   ```

9. 初始化虚拟机环境

   ```shell
     python3 -m venv ~/venv
   ```

10. 安装 superset

   ```shell
     pip install -i https://mirrors.aliyun.com/pypi/simple/ apache-superset
   ```

#### 命令启动

1. 依次执行以下命令启动superset服务

   ```shell
     superset db upgrade
     export FLASK_APP=superset
     superset fab create-admin
     superset load_examples
     superset init
     superset run -p 8088 --with-threads --reload --debugger
   ```

## 支持 clickhouce

### 基于 dockerhub 中 superset 镜像安装 clickhouce python 驱动包

<https://registry.hub.docker.com/r/apache/superset>

创建 Dockerfile 文件，用来重新构建 docker 镜像，内容如下：

```py
FROM apache/superset
# Switching to root to install the required packages
USER root
# Example: installing the MySQL driver to connect to the metadata database
# if you prefer Postgres, you may want to use `psycopg2-binary` instead
RUN pip install clickhouse-driver
# Example: installing a driver to connect to Redshift
# Find which driver you need based on the analytics database
# you want to connect to here:
# https://superset.apache.org/installation.html#database-dependencies
RUN pip install clickhouse-sqlalchemy
# Switching back to using the `superset` user
USER superset
```

执行 docker 构建命令，生成新的镜像

```bash
docker build -t="xxx/superset:v2" .
```

## 参考资料

* <http://mrdede.com/?p=3196>
* <https://blog.csdn.net/weixin_30855761/article/details/95477404>

参考官网说明：<https://superset.apache.org/docs/installation/installing-superset-from-scratch>

'connector'='jdbc',
  'url'='jdbc:clickhouse://x.x.x.x:8123/default',
  'username'='default',
  'password'='',

地址 x.x.x.x:8123  
库名:xxx
'username'='default',
  'password'='',
clickhouse+native://default@x.x.x.x:8123/xxx

chUsername: clickhouse_operator
chPassword: xxx
chPort: 8123
