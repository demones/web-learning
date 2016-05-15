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

1. 撤销上一次的 commit

  `git reset --soft HEAD~1` 后面数字可以看作是取消的 commit 次数，--soft 参数表示只取消 commit 但保留文件的修改（相当于git add 之后的的状态），如果你想连修改都不要的话就用 --hard 参数。

  取消上一次操作，还可以这样 `git reset HEAD^`

  根据每次版本 hashId 来撤销，首先执行 `git log` ，找到要恢复的 hashId，然后 `git reset --hard hashId`

2. 撤销已经同步到服务器的提交


### git subtree

在 git 版本 1.7.9.4 中，引入了 git-subtree，基本是用于替换 git-submodule。git-submodule 处理太复杂，git-subtree 因此应运而生。git 官方也推荐尽量采用 git-subtree。

git subtree 不只是可以引用其他的仓库，也可以引用自己仓库下不同的分支，这样就可以在当前分支下处理其他分支了，一个重要的应用，
就是把代码发布到 Github Pages 上，不用来回的切换分支了，下面也会着重介绍怎样快速把代码发布到 Github Pages。

下面看 git subtree 的一些基本操作，以下操作为两个不同的仓库，同一仓库不同的分支，可以参考“快速把代码发布到 Github Pages”一节

1. clone 一个远程仓库 dotfiles 到你本地

  ```bash
  $ git clone git@github.com:username/dotfiles.git
  $ cd dotfiles
  ```

2. 增加一个 subtree bash
  ```bash
  $ git remote add bash git@github.com:username/bash.git  # bash 可以理解为远程仓库的别名
  $ git subtree add pull -P home/bash bash master --squash # 拉取远程仓库 bash 到本地仓库的home/bash 目录  
  ```

3. 修改 subtree bash 下代码然后提交到远程 bash 的 master分支

  ```bash
  ...... edit home/bash/file......
  $ git commit -a -m 'update bash content'
  $ git subtree push -P home/bash bash master
  $ git push origin master # 顺便主项目也 push
  ```

4. 远程的子项目有更新了，拉下来合并
  ```bash
  $ git subtree pull -P home/bash bash master --squash
  ```
5. 参考
  * http://havee.me/linux/2012-07/the-git-advanced-subtree.html
  * http://aoxuis.me/post/2013-08-06-git-subtree
  * https://github.com/git/git/blob/master/contrib/subtree/git-subtree.txt

## 快速把代码发布到 Github Pages
这里要利用到 `git subtree` 命令来实现。首先我们想一想，如果不借助于 `git subtree` ，通常做法是怎样来处理的。
我们首先需要创建分支 gh-pages, 然后切换到该分支下，最后把文件提交到 gh-pages 分支中。
对于 master 和 gh-pages 中的内容一样的情况下，这种实现尚且可以，如果不一样，我们就得复制来复制去，很麻烦，还容易出错，
有了 `git subtree` 后，一切变得是那么简单。下面看具体实现（以 gitbook 的生成为例）

1. 首先需要在 github 中创建分支 gh-pages ，当然本地创建后再同步到服务器端也可以。本人建议直接在 github 中创建，这样会更便捷些。
2. 把分支 gh-pages 添加到本地 subtree 中

  ```
  git subtree add --prefix=_book --squash origin gh-pages
  ```

3. 往 github pages 上提交的内容位于 _book 下，该目录是不需要提交到 master 上的，所以首先需要把 .gitignore 中已或略的文件 _book 去掉，当然如果 _book 也想提交到 master 分支中，则不用修改 .gitignore

4. 修改 _book 文件后，执行以下命令，提交修改的文件

  ```
  git add -A _book
  git commit -m "Update _book"
  git subtree push --prefix=_book origin gh-pages
  ```
5. push 到远程 gh-pages 分支中
  ```
  git subtree push --prefix=_book origin gh-pages
  ```

6. 同时恢复 .gitignore
7. 远程的分支有更新了，拉下来合并
  ```bash
  $ git subtree pull --prefix=_book origin gh-pages --squash
  ```

## 在 mac 系统下，终端（terminal）显示分支等版本信息的设置

* 方法一： 在 ~/.bash_profile 中添加以下脚本（如果不存在~/.bash_profile则创建，命令为： `touch ~/.bash_profile`）
  ```
  parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
  }
  export PS1="\u@\h \W\[\033[32m\]\$(parse_git_branch)\[\033[00m\] $ "
  ```
* 方法二：也是在 ~/.bash_profile 中添加脚本
  主要实现有：
    * 显示当前路径
    * 显示当前所在分支
    * 显示当前修改状态
      *   = 表示一个干净的分支
      *   ~ 表示文件有改动
      *   * 表示文件有增加或删除 但未 commit
      *   + 表示有新文件
      *   # 表示已commit 但未 push

  ```
  function parse_git_dirty {
    local git_status=$(git status 2> /dev/null | tail -n1) || $(git status 2> /dev/null | head -n 2 | tail -n1);
    if [[ "$git_status" != "" ]]; then
        local git_now; # 标示
        if [[ "$git_status" =~ nothing\ to\ commit || "$git_status" =~  Your\ branch\ is\ up\-to\-date\ with ]]; then
            git_now="=";
        elif [[ "$git_status" =~ Changes\ not\ staged || "$git_status" =~ no\ changes\ added ]]; then
            git_now='~';
        elif [[ "$git_status" =~ Changes\ to\ be\ committed ]]; then #Changes to be committed
            git_now='*';
        elif [[ "$git_status" =~ Untracked\ files ]]; then
            git_now="+";
        elif [[ "$git_status" =~ Your\ branch\ is\ ahead ]]; then
            git_now="#";
        fi
        echo "${git_now}";
    fi
  }

  function git_branch {
      ref=$(git symbolic-ref HEAD 2> /dev/null) || return;
      echo "("${ref#refs/heads/}") ";
  }


  export PS1="[\[\033[1;32m\]\w\[\033[0m\]] \[\033[0m\]\[\033[1;36m\]\$(git_branch)\[\033[0;31m\]\$(parse_git_dirty)\[\033[0m\]$ "

  ```
* 方法三： 推荐使用强大的 zsh https://github.com/robbyrussell/oh-my-zsh
  比较好的主题
  * robbyrussell 官方默认的
  * blinks 每次执行命令时，背景高亮显示
  * ys 可以显示时间
  * pygmalion 样式风格不错

## Github

### Github 相关资料

* [Github Developer](https://developer.github.com/)
* [Gitignore 各种语言忽略文件说明](https://developer.github.com/.gitignore)


## 学习参考
* [git 官网](https://www.git-scm.com/)
* [中文文档](https://www.git-scm.com/book/zh/v2)
* [版本控制入门 – 搬进 Github](http://www.imooc.com/learn/390)
* [上面视频对应电子书](http://happypeter.github.io/gitbeijing/)
