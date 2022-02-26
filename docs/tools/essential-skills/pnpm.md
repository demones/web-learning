# pnpm 学习笔记

## 给子项目安装依赖

```shell
pnpm add -D xxx --filter packageName
```

* ```xxx``` 为安装报名
* ```-D``` 为安装到 ```devDependencies``` 中
* ```packageName``` 为子包 ```name```

## 指定目录

```shell
pnpm xxx --dir ./packages/name
```

* ```xxx``` 为要执行的命令
* ```--dir``` 为指定的目录参数，也可以使用简写方式 ```-C```
* ```name``` 为具体的目录
