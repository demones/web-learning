# 终端

## ohmyzsh
安装 myzsh 详见官网
* https://ohmyz.sh/
* https://github.com/ohmyzsh/ohmyzsh

oh-my-zsh 主题：  ls ~/.oh-my-zsh/themes 修改主题，在 .zshrc 中修改 ZSH_THEME="robbyrussell" 即可

oh-my-zsh 插件：  ls ~/.oh-my-zsh/plugins 修改插件，在 .zshrc 中修改 plugins=(git github gulp nvm npm node brew cp) 即可

注意：安装 zsh oh-my-zsh 后，一些命令找不到解决方法，比如 nvm，

在 .zshrc 中加入如下设置

```hash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  # 以下命令如报错，可去掉
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

## 主题
下载 git clone https://github.com/mbadolato/iTerm2-Color-Schemes.git ，找到终端相关主题，点击安装
其他主题 https://sspai.com/post/53008
