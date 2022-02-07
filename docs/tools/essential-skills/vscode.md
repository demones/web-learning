# vscode 操作指南

## 设置

* 使用命令行启动
  command + shift + p 打开命令搜索，输入 shell command install 'code' command in path 把 code 命令设置到环境变量中，在终端直接用 code 就可以启动 vscode 了，如

  ```shell
  code . # 打开当前目录
  code path # 打开某个目录
  ```

## 主题

## 插件

* vetur
* eslint
* GitLens
* Auto Rename Tag
* stylelint
* Css Peek

## 快捷键

* shift + cmd + p ：显示所有命令
* cmd + p ：快速打开文件
* cmd + , ：打开配置文件
* 重开一行：光标在行尾的话，回车即可；不在行尾，cmd + enter 向下重开一行；shift + cmd + enter 则是在上一行重开一行
* 删除一行：光标没有选择内容时，cmd + x 剪切一行；shift + cmd + k 直接删除一行或多行
* 移动一行：alt + ↑ 向上移动一行；alt + ↓ 向下移动一行
* 复制一行：shift + alt + ↓ 向下复制一行；shift + alt + ↑ 向上复制一行
* cmd + f ：搜索
* cmd + alt + f： 替换
* cmd + shift + f：在项目内搜索
* ctrl + - 跳转到上一次操作
* shift + ctrl + - 反向跳转到上一次操作

## 解决下载慢的原因

* 从官方下载，如果发现下载慢，是因为走的是国外下载资源，这时我们替换成国内的就可以了
* 先复制生成的下载链接地址，如 https://vscode.cdn.azure.cn/stable/899d46d82c4c95423fb7e10e68eba52050e30ba3/VSCode-darwin-universal.zip
* 修改成国内镜像链接，只需要该前面的 vscode.cdn.azure.cn 替换为 vscode.cdn.azure.cn 即可

## 彻底卸载 vscode

* 退出vscode
* 删除配置文件

```shell
rm -rf $HOME/Library/Application\ Support/Code
# if you're using insider*
rm -rf $HOME/Library/Application\ Support/Code\ -\ Insiders/
```
* 删除配置文件
```shell
rm -rf $HOME/.vscode
# if you're using insider*
rm -rf $HOME/.vscode-insiders/
```
* 从应用中删除vscode
* 卸载所有vscode系统配置
