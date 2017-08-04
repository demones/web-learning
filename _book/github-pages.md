创建 github pages

# 利用 git subtree 提交代码到 GitHub Pages

利用 git subtree 可以很方便的管理 gh-pages 分支

以下命令列出了详细操作，初始化的时候需要先执行前两步，再执行第三步，以后更新 gh-pages 时，只需执行第三步即可。

1. 创建 gh-pages 分支，**注意：在执行 git subtree add 命令之前，需确保 gh-pages 分支下至少存在一个文件**
```
git checkout -b gh-pages //创建并切换到分支 gh-pages
rm -rf *  //隐藏文件需要单独删除，结合命令 ls -a
vim .gitignore //输入要忽略的文件
git add .
git commit -m "init branch gh-pages"
git push --set-upstream origin gh-pages
git checkout master
```

2. 把分支 gh-pages 添加到本地 subtree 中，执行该命令前，请确保 _book 文件夹不存在

```
git subtree add --prefix=_book origin gh-pages --squash
```

3. 生成 docs
```
gitbook build
git add _book
git commit -m "Update docs"
git subtree push --prefix=_book origin gh-pages --squash
git push
```
