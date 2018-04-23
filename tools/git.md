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

6. 拉取远程分支到本地

git pull <远程主机名> <远程分支名>:<本地分支名>

举例如下：
```
git pull origin branch2:branch2
```

git pull origin dev-20160901:dev-20160901

或者

```
git checkout -b local-branchname remotes/origin/remote_branchname
```

6. 从一个资源切换到另一个资源
如果之前在 git 上创建了一个资源(repository)，如果想把本地的代码提交到另一个新的资源(repository)上，可以执行以下命令

```
git remote rm origin
git remote add origin git@github.com:myname/newrep.git
git branch --set-upstream-to=origin/master master
```

7. 查看远程分支
```
git branch -a
```

详细参考[这里](https://stackoverflow.com/questions/1221840/remote-origin-already-exists-on-git-push-to-a-new-repository)
和[这里](https://www.kernel.org/pub/software/scm/git/docs/git-remote.html)

## 从服务端拉取某一分支到本地

1. 本地 `git init` 初始化项目
2. 用服务端分支名给本地创建一个分支 `git checkout -b branchName`
3. 提交本地分支代码
4. 绑定服务端资源 `git remote add origin http://jcode.cbpmgt.com/git/ft_personal_account.git`
5. 本地分支与服务端关联  `git branch --set-upstream-to=origin/dev dev`
6. 更新服务端代码 `git pull --allow-unrelated-histories` 加上 --allow-unrelated-histories 允许合并有冲突的代码
7. 解决冲突，提交代码


## git 常见命令 （持续完善中）

### 添加文件 `git add`

选项和说明
* `-u` 只添加修改的文件
* `-A` 添加所有文件，包括已删除的文件
* `git add .` 添加修改和新增的文件（不包括已删除的文件）
* `git add file*.js` 添加指定的文件，可以用通配符

### 提交 `git commit`

1. 修改最后一次提交
   有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了，这时我们可以使用 --amend 选项重新提交，把漏掉的文件补上或是
   修改提交信息。
   `git commit --amend`
   ```
   $ git commit -m 'initial commit'
   $ git add forgotten_file
   $ git commit --amend
   ```
2. 取消已经暂存的文件
   我们不小心用 `git add .` 全加到了暂存区域，我们可以执行 `git reset HEAD <file>` 取消某个文件，或所有文件，
   `<file>` 是指要取消的暂存文件，不输入，则取消所有。或者直接执行 `git reset` 取消所有暂存

1. 撤销上一次的 commit

  `git reset --soft HEAD~1` 后面数字可以看作是取消的 commit 次数，--soft 参数表示只取消 commit 但保留文件的修改（相当于git add 之后的的状态），如果你想连修改都不要的话就用 --hard 参数。

  取消上一次操作，还可以这样 `git reset HEAD^`

  根据每次版本 hashId 来撤销，首先执行 `git log` ，找到要恢复的 hashId，然后 `git reset --hard hashId`

2. 撤销已经同步到服务器的提交

### 推送 `git push`

1. 删除远程分支和tag
  ```
  git push origin --delete <branchName>
  git push origin --delete tag <tagname>
  ```


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

1. 首先需要在本地或 github 中创建分支 gh-pages，如果要发布到 gh-pages 分支与 master 上的内容不同，首先需要删除分支中的内容，执行命令为

  ```
  git checkout gh-pages
  //利用命令或手动删除不需要放到 gh-pages 分支中的内容
  git add -A
  git commit -m "clear gh-pages"
  git push （如果远程分支 gh-pages 不存在的话，命令是 git push --set-upstream origin gh-pages）
  git checkout master
  ```

  如果分支 gh-pages 已存在，则第一步忽略
2. 把分支 gh-pages 添加到本地 subtree 中，执行该命令前，请确保 _book 文件夹不存在，执行完会提示 “pathspec '_book' did not match any file(s) known to git.”，需要我们创建 _book 目录

  ```
  git subtree add --prefix=_book origin gh-pages --squash
  ```

3. 执行 `gitbook build` 在目录 _book 中生成 gitbook 文件

4. 执行以下命令，提交修改的文件

  ```
  git add -A _book
  git commit -m "Update gitbook"
  ```

5. push 到远程 gh-pages 分支中
  ```
  git subtree push --prefix=_book origin gh-pages --squash
  ```

  如果本地与远程不同步，需要执行
  ```bash
  git subtree pull --prefix=_book origin gh-pages --squash
  ```
  所以建议先 pull 再 push，这样确保本地与远程同步

6. 上面的操作，只是把内容提交到 gh-pages 分支中，而没有把内容提交到 master 分支中，所以需要同时提交到 master 分支中，执行以下命令
  ```
  git push
  ```
7. 下次修改 _book 文件夹下的内容，只需从上面第三步执行即可。

  **注意：这种方式的副作用是，_book 需要同时也放到 master 分支中。也许有其他命令，不需要把 _book 放到 master 分支中，待考证。**

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
      *   \* 表示文件有增加或删除 但未 commit
      *   \+ 表示有新文件
      *   \# 表示已commit 但未 push

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

## GitHub中如何更新已经fork的代码
github上有个很方便的功能叫fork，将别人的工程一键复制到自己账号下。当被 fork 的资源有更新时，我们需要手动更新，请按下面步骤操作

1. 下载 fork 后的资源到本地
   ```
   git clone git@github.com:username/repository.git
   ```
2. 增加源分支地址到你项目远程分支列表中(此处是关键)，需要将原来的仓库指定为 upstream，命令如下
   ```
   git remote add upstream git@github.com/被fork的仓库.git
   ```

3. fetch源分支的新版本到本地
   ```
   git fetch upstream
   ```
   在 fetch 前也可以执行命令来查看远程分支列表 `git remote -v` 或 `git branch -a`

4. 合并两个版本的代码
   ```
   git merge upstream/master
   # 或者其他分支
   ```
   如果本地有修改过的内容，合并的过程可能有冲突，根据提示修改冲突的文件，重新提交到本地即可。

   如果想合并 tag 比如 v4.8.3 可以先执行 `git checkout v4.8.3` `git checkout -b v4.8.3` `git merge v4.8.3`

6. 将合并后的代码push到 github 上去
   ```
   git push
   ```

如果嫌麻烦或是本地代码没有修改，也可以直接先删除以前 fork 的资源，然后再重新 fork 一个即可。另外 fork 下来的资源如果有修改，最好新创建一个分支

另外如果想使用被 fork 资源的某一分支或某一 tag，比如想修改被 fork 的资源某一稳定版本，并重新修改名称发布到 npm 上，可按照以下方式处理

1. 切换到某一 branch 或 tag
  ```
  git checkout -b branch_name tag_name
  ```   
2. 修改代码
3. npm publish

或者使用 github desktop 界面操作更简洁
https://www.cnblogs.com/mff520mff/archive/2017/08/13/7355118.html


## http 或 https 保存当前密码设置
git config --global credential.helper store

## 学习参考
* [git 官网](https://www.git-scm.com/)
* [中文文档](https://www.git-scm.com/book/zh/v2)
* [版本控制入门 – 搬进 Github](http://www.imooc.com/learn/390)
* [上面视频对应电子书](http://happypeter.github.io/gitbeijing/)
