# git

## 添加到github中相关步骤（简单版）

1. 在github上创建一个资源库 Repository
2. 在当前项目路径下
    - 初始化 git init
    - 添加： git add -A 或 git add .
    - 提交： git commit -m "Init this project."
    - 绑定 github远程仓库（我们用ssh方式，这样每次提交不用输入密码）：

        > git remote add origin git@github.com:username/repository.git
    - 提交到服务器端：git push origin master
  这里需要注意的是：如果我们在github中创建资源库的时候添加了readme.md等文件，在提交到服务器之前需要git pull，执行以下命令

        > git pull git@github.com:username/repository.git master

    - 设置 git push 直接提交到远程仓库中可以执行以下命令

         > git push --set-upstream origin master
3. 我们也可以直接用以下命令先把远程代码clone到本地，再 add commit。这种方式比较简单一些

   > git clone git@github.com:username/repository.git

4. 创建分支

   ```
   git branch v0.0.1 创建本地分支
   git checkout v0.0.1 切换到本地分支
   git merge -m "Merge from master" master 合并分支（需要的话）
   git push --set-upstream origin v0.0.1 提交到服务器端
   ```

5. 创建tag（所创建的tag指向所在的分支，这里创建轻量级的tag）

   参考文章 http://blog.csdn.net/wh_19910525/article/details/7470850

   ```
   git tag 0.0.1   创建tag
   git push origin --tags   提交的服务器端（github）
   git tag -d 0.0.1     删除本地tag
   git push origin :refs/tags/0.0.1     删除远程tag
   ```

## git 常见命令 （持续完善中）

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


## 快速把代码发布到 Github Pages

假设你要发布的内容位于 dist 下，首先需要把 .gitignore 中已或略的文件 dist 去掉，然后执行以下命令

```
git add dist
git subtree push --prefix=dist origin gh-pages
```


发布完后，执行以下命令，把 dist 从 git 暂存区中删除，注意，如果不加 --cached，表示除了从暂存区中删除，还会物理删除该文件夹

```
git rm --cached dist
```

同时恢复 .gitignore

## Github

### Github 相关资料

* [Github Developer](https://developer.github.com/)
* [Gitignore 各种语言忽略文件说明](https://developer.github.com/.gitignore)


## 学习参考
* [git 官网](https://www.git-scm.com/)
* [中文文档](https://www.git-scm.com/book/zh/v2)
* [版本控制入门 – 搬进 Github](http://www.imooc.com/learn/390)
* [上面视频对应电子书](http://happypeter.github.io/gitbeijing/)
