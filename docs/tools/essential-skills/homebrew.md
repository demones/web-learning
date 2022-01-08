# homebrew 包管理工具

## 镜像安装

默认从官方安装太慢或者安装失败，可以使用国内的镜像地址 <https://gitee.com/cunkai/HomebrewCN>

安装脚本

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

安装过程中按提示即可，都是中文提示，方便国内用户

卸载脚本

```shell
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

## 镜像地址设置和还原

* 替换brew.git

  ```shell
    cd "$(brew --repo)"
    git remote set-url origin https://mirrors.ustc.edu.cn/brew.git
  ```

* 替换homebrew-core.git

  ```shell
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
  ```

* 还原成官方

  ```shell
    cd "$(brew --repo)"
    git remote set-url origin https://github.com/Homebrew/brew.git
    cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
    git remote set-url origin https://github.com/Homebrew/homebrew-core.git
  ```

## 查看 brew 安装的软件路径

```shell
brew list openjdk
```
