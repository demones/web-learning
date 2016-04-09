# git

## git 常见命令 （待整理）

### 添加文件 `git add`

选项和说明
* `-u` 只添加修改的文件
* `-A` 添加所有文件，包括已删除的文件
* `git add .` 添加修改和新增的文件（不包括已删除的文件）
* `git add file*.js` 添加指定的文件，可以用通配符

### 提交 `git commit`

### 撤销上一次的 commit

`git reset --soft HEAD~1` 后面数字可以看作是取消的 commit 次数，--soft 参数表示只取消 commit 但保留文件的修改（相当于git add 之后的的状态），如果你想连修改都不要的话就用 --hard 参数。

取消上一次操作，还可以这样 `git reset HEAD^`

根据每次版本 hashId 来撤销，首先执行 `git log` ，找到要恢复的 hashId，然后 `git reset --hard hashId`

### 撤销已经同步到服务器的提交



## 学习参考
* [git 官网](https://www.git-scm.com/)
* [中文文档](https://www.git-scm.com/book/zh/v2)
* [版本控制入门 – 搬进 Github](http://www.imooc.com/learn/390)
* [上面视频对应电子书](http://happypeter.github.io/gitbeijing/)
