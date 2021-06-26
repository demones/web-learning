# Python 学习笔记

## 官网

https://www.python.org/

## 安装

### 使用[pyenv](https://github.com/pyenv/pyenv) 安装管理 Python

pyenv 安装说明

* ```brew install pyenv```
* 根据终端的不同执行以下命令（以下为zsh），其他参考官网说明

  ```shell
    echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
    echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
    echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc
  ```

* 查看所有Python版本 ```pyenv install --list```
* 查看已安装的Python ```pyenv versions```
* 安装最新版本，比如 ```pyenv install 3.9.4```
* 设置全局Python 版本 ```pyenv global 3.9.4```
* 参考：<https://www.jianshu.com/p/cea9259d87df>

pyenv install 安装太慢或失败解决方法

* 提前下载离线包，如 3.9.4 下载地址为：https://www.python.org/ftp/python/3.9.4/Python-3.9.4.tar.xz
* 复制下载后的离线包到 ~/.pyenv/cache(如cache没有创建，需手动创建)
* 再执行安装命令即可完成安装 ```pyenv install 3.9.4```

当然也可以使用pyenv镜像加速安装

```shell
export PYTHON_BUILD_MIRROR_URL_SKIP_CHECKSUM=1
export PYTHON_BUILD_MIRROR_URL=https://npm.taobao.org/mirrors/python
pyenv install 3.9.4
```

## Python镜像

### 镜像地址

https://pypi.douban.com/simple/ 豆瓣
https://mirrors.aliyun.com/pypi/simple/ 阿里
https://pypi.hustunique.com/simple/ 华中理工大学
https://pypi.sdutlinux.org/simple/ 山东理工大学
https://pypi.mirrors.ustc.edu.cn/simple/ 中国科学技术大学
https://pypi.tuna.tsinghua.edu.cn/simple 清华

### 临时使用

添加 -i 或 --index 参数

```shell
pip install -i https://mirrors.aliyun.com/pypi/simple/ apache-superset
```
