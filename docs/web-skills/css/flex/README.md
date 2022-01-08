# Flexbox 布局详解
   2009年，W3C提出了一种新的方案----Flex布局，可以简便、完整、响应式地实现各种页面布局。
目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。
以下介绍是基于2015年5月份提供的最新草案，最后会给出对旧的浏览器兼容性实现

## 什么是 Flexbox 布局
Flexbox布局官方称之为CSS Flexible Box布局模块,他是CSS3中的一种新的布局模式。
Flexbox可以控制未知容器元素的对齐方式，排列方向，排列顺序等，甚至是在未知大小的容器也能这样做。
Flex容器的主要特点是能够修改其子元素（Flex item）的宽度或高度，使其在不同的屏幕尺寸中填补可用的空间。

许多设计人员和开发人员发现使用Flexbox来布局更容易，可以使用更少的代码，更简单的方式实现更复杂的布局，也使整个开发过程更为简单。
Flexbox布局算法基于水平或垂直的块或行内元素来布局。Flexbox布局常用于小的应用程序组件之中。

**注意，设为Flex布局以后，子元素的 `float`、`clear`和`vertical-align`属性将失效。**

使用Flexbox布局只要在父容器元素上设置display属性即可

```
.flex-container {
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

如果你想将其设置为一个内联元素，可以像下面这样使用

```
.flex-container {
  display: -webkit-inline-flex; /* Safari */
  display: inline-flex;
}
```

## 参考资料
* [终极Flexbox属性查询列表](http://www.w3cplus.com/css3/css3-flexbox-cheat-sheet.html)
* [一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox-new.html)
