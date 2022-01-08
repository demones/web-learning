# WebStorm 操作指南

## 解决无法输入中文的bug

解决在 mac 系统下 IntelliJ IDEA、 WebStorm 等系列文件无法输入中文的 bug

* 首先确保 java 版本为 1.8.0_45，可以用命令 `java --version` 来查看
* jdk 8U45 下载地址为： http://www.oracle.com/technetwork/java/javase/downloads/java-archive-javase8-2177648.html#jdk-8u45-oth-JPR
* 无法下载的话，可以从中文网下载 http://z.download.csdn.net/download/tan3739/8822145
* jdk 卸载方法请看这里 http://docs.oracle.com/javase/7/docs/webnotes/install/mac/mac-jdk.html#uninstall
* 安装好 jdk 8U45 后在终端执行以下命令，首先备份WebStorm 下自带的 jdk，然后 ln 安装的 jdk

  ```shell
  /Applications/WebStorm.app/Contents/jre
  mv jdk jdk.backup
  ln -s /Library/Java/JavaVirtualMachines/jdk1.8.0_45.jdk jdk
  ```

* 重启 WebStorm，搞定，其他 IntelliJ IDEA 等也是如此
* 字体渲染问题 在/Applications/WebStorm.app/Contents/bin/webstorm.vmoptions 最后添加以下代码

  ```shell
  -Dawt.useSystemAAFontSettings=gasp
  -Dswing.aatext=true
  -Dsun.java2d.xrender=true
  ```

* 有时会卡顿
  * 设置最大内存，打开 /Applications/Webstorm.app/Contents/bin/webstorm.vmoptions，-Xmx750m 修改为 -Xmx2048m 或者更大的值
  * 减少不必要的文件索引，如构建输出文件夹等：设置 Preferences -> Directories 点击不需要索引的目录，然后点击 EXcluded，更多细节参见[官方文档](https://www.jetbrains.com/help/webstorm/2016.1/directories.html?origin=old_help)
* 参考文章 https://csspod.com/webstorm-tips-on-mac/

## 主题设置

colors 存放地址 ~/Library/Preferences/WebStorm2016.1/colors

* https://github.com/jkaving/intellij-colors-solarized
* https://github.com/rofrol/oceanic-next-jetbrains-theme
* https://github.com/jumbojett/WebStorm-Verou-Theme

## 配置项说明

### 去掉保存文件时自动在行尾加上一空行

Preferences - Editor - General - Other 去掉 "Ensure line feed at file on Save" 勾选

### Vue 文件 script 和 style 空两行

Preferences - Editor - Code Style - Vue - Tabs and Indents - Indent children of top-level-tag，加上 script 和 style
