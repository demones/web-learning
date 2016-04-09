# 兼容型

## 概述
从2009年提出的最初草案开始，Flexbox布局经历了多次的迭代和几个语法版本的变更。详细可以参考官方说明
[CSS Flexible Box布局模块](https://www.w3.org/TR/css-flexbox/)

浏览器对最新flexbox规范的支持情况为：

* Chrome 29+
* Firefox 28+
* Internet Explorer 11
* Opera 17+
* Safari 6.1+ (prefixed with -webkit-)
* Android 4.4+
* iOS 7.1+ (prefixed with -webkit-)

更多关于 flexbox 兼容型可以从 [Can I Use](http://caniuse.com/) 中查看 http://caniuse.com/#feat=flexbox

<iframe height="380px" src="http://caniuse.com/flexbox/embed" width="100%"></iframe>


## 参考文章
关于新旧浏览器兼容型写法，可以参考以下文章

* [使用Flexbox：新旧语法混用实现最佳浏览器兼容](http://www.w3cplus.com/css3/using-flexbox.html)
* [“老”的Flexbox和“新”的Flexbox](http://www.w3cplus.com/css3/old-flexbox-and-new-flexbox.html)
* [时下Web App中的Flexbox应用](http://www.w3cplus.com/css3/harnessing-flexbox-for-todays-web-apps.html)
* [探索Flexbox](http://www.w3cplus.com/css3/flexbox-adventures.html)
* [一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox-new.html) 该文章介绍的比较全面
* [flewbox bug 整理](https://github.com/philipwalton/flexbugs)
* [Flewbox 相关文章](http://www.w3cplus.com/blog/tags/157.html)
* [Flexbox 非常容易 制作 CSS 布局](http://www.tuicool.com/articles/quQVv2)
* [Flex弹性布局在移动设备上的应用](http://my.oschina.net/yinyongcom666/blog/151085)

## 兼容性写法例子
<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
}

.direction-row {
  -webkit-flex-direction: row; /* Safari */
  flex-direction: row;
}

.direction-row-reverse {
  /***兼容性写法***/
  -moz-box-direction:reverse; /* Firefox */
  -webkit-box-direction:reverse; /* Safari、Opera 以及 Chrome */
  box-direction:reverse;

  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
}

.direction-column {
  /***兼容性写法***/
  -moz-box-orient:vertical; /* Firefox */
  -webkit-box-orient:vertical; /* Safari、Opera 以及 Chrome */
  box-orient:vertical;

  -webkit-flex-direction: column; /* Safari */
  flex-direction: column;
}

.direction-column-reverse {
  /***兼容性写法***/
  -moz-box-orient:vertical; /* Firefox */
  -webkit-box-orient:vertical; /* Safari、Opera 以及 Chrome */
  box-orient:vertical;
  -moz-box-direction:reverse; /* Firefox */
  -webkit-box-direction:reverse; /* Safari、Opera 以及 Chrome */
  box-direction:reverse;

  -webkit-flex-direction: column-reverse; /* Safari */
  flex-direction: column-reverse;
}

.flex-start{
  /*老版本语法*/
  -webkit-box-pack: start;
  -moz-box-pack: start;
  /*混合版本语法*/
  -ms-flex-pack: start;
  /*新版本语法*/
  -webkit-justify-content: flex-start; /* Safari */
  justify-content: flex-start;
}

.flex-center {
  /*老版本语法*/
  -webkit-box-pack: center;
  -moz-box-pack: center;
  /*混合版本语法*/
  -ms-flex-pack: center;
  /*新版本语法*/
  -webkit-justify-content: center; /* Safari */
  justify-content: center;   
}

.flex-end{
  /*老版本语法*/
  -webkit-box-pack: end;
  -moz-box-pack: end;
  /*混合版本语法*/
  -ms-flex-pack: end;
  /*新版本语法*/
  -webkit-justify-content: flex-end; /* Safari */
  justify-content: flex-end;  
}

.flex-space-between{
  /*老版本语法*/
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  /*混合版本语法*/
  -ms-flex-pack: justify;
  /*新版本语法*/
  -webkit-justify-content: space-between; /* Safari */
  justify-content: space-between;
}

.flex-space-around{
  /*混合版本语法*/
  -ms-flex-pack: distribute;
  /*新版本语法*/
  -webkit-justify-content: space-around; /* Safari */
  justify-content: space-around;
}

.align-items-start {
  /*老版本语法*/
  -webkit-box-align: start;
  -moz-box-align: start;
  /*混合版本语法*/
  -ms-flex-align: start;
  /*新版本语法*/
  -webkit-align-items: flex-start; /* Safari */
  align-items: flex-start;
}

.align-items-end {
  /*老版本语法*/
  -webkit-box-align: end;
  -moz-box-align: end;
  /*混合版本语法*/
  -ms-flex-align: end;
  /*新版本语法*/
  -webkit-align-items: flex-end; /* Safari */
  align-items: flex-end;
}

.align-items-center {
  /*老版本语法*/
  -webkit-box-align: center;
  -moz-box-align: center;
  /*混合版本语法*/
  -ms-flex-align: center;
  /*新版本语法*/
  -webkit-align-items: center; /* Safari */
  align-items: center;
}

.align-items-baseline {
  /*老版本语法*/
  -webkit-box-align: baseline;
  -moz-box-align: baseline;
  /*混合版本语法*/
  -ms-flex-align: baseline;
  /*新版本语法*/
  -webkit-align-items: baseline; /* Safari */
  align-items: baseline;
}

.align-items-stretch {
  /*老版本语法*/
  -webkit-box-align: stretch;
  -moz-box-align: stretch;
  /*混合版本语法*/
  -ms-flex-align: stretch;
  /*新版本语法*/
  -webkit-align-items: stretch; /* Safari */
  align-items: stretch;
}

.align-content-start {
  /*混合版本语法*/
  -ms-flex-line-pack: start;
  /*新版本语法*/
  -webkit-align-content: flex-start; /* Safari */
  align-content: flex-start;
}

.align-content-end {
  /*混合版本语法*/
  -ms-flex-line-pack: end;
  /*新版本语法*/
  -webkit-align-content: flex-end; /* Safari */
  align-content: flex-end;
}

.align-content-center {
  /*混合版本语法*/
  -ms-flex-line-pack: center;
  /*新版本语法*/
  -webkit-align-content: center; /* Safari */
  align-content: center;
}

.align-content-between {
  /*混合版本语法*/
  -ms-flex-line-pack: justify;
  /*新版本语法*/
  -webkit-align-content: space-between; /* Safari */
  align-content: space-between;
}

.align-content-around {
  /*混合版本语法*/
  -ms-flex-line-pack: distribute;
  /*新版本语法*/
  -webkit-align-content: space-around; /* Safari */
  align-content: space-around;
}

.align-content-stretch {
  /*混合版本语法*/
  -ms-flex-line-pack: stretch;
  /*新版本语法*/
  -webkit-align-content: stretch; /* Safari */
  align-content: stretch;
}

.container-demo {
  border: 1px solid darkcyan;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  width:30px;
  height:30px;
  border:1px solid darkcyan;
  text-align:center;
}

.align-content-demo {
  width: 100px;
  height:200px;
  -webkit-flex-flow: wrap; /* Safari */
  flex-wrap: wrap;
}

</style>

### 主轴方向

从左向右排列
<div class="flex-container direction-row container-demo">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
</div>

从右向左排列
<div class="flex-container direction-row-reverse container-demo">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
</div>

从上向下排列
<div class="flex-container direction-column container-demo">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
</div>

从下向上排列
<div class="flex-container direction-column-reverse container-demo">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
</div>

示例代码

[import:1-15, flex-direction.md](../../codes/flex/flex-direction.md)

### 一行或多行布局（没有找到更好的兼容型写法，有 box-lines 属性，但支持性不是很好）

### 主轴方向对齐方式

左对齐 flex-start
<div class="flex-container container-demo flex-start">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

右对齐 flex-end
<div class="flex-container container-demo flex-end">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

居中 center
<div class="flex-container container-demo flex-center">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

两端对齐 space-between
<div class="flex-container container-demo flex-space-between">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

平均分布 space-around
<div class="flex-container container-demo flex-space-around">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

示例代码

[import:1-15, justify-content.md](../../codes/flex/justify-content.md)

### 侧轴排列方式

侧轴的起点对齐 flex-start
<div class="flex-container container-demo align-items-start">
  <div class="item-demo" style="height:30px;">1</div>
  <div class="item-demo" style="height:50px;">2</div>
  <div class="item-demo" style="height:40px;">3</div>
  <div class="item-demo" style="height:70px;">4</div>
</div>

侧轴的终点对齐 flex-end
<div class="flex-container container-demo align-items-end">
  <div class="item-demo" style="height:30px;">1</div>
  <div class="item-demo" style="height:50px;">2</div>
  <div class="item-demo" style="height:40px;">3</div>
  <div class="item-demo" style="height:70px;">4</div>
</div>

侧轴的中点对齐 center
<div class="flex-container container-demo align-items-center">
  <div class="item-demo" style="height:30px;">1</div>
  <div class="item-demo" style="height:50px;">2</div>
  <div class="item-demo" style="height:40px;">3</div>
  <div class="item-demo" style="height:70px;">4</div>
</div>

按照子元素第一行文字的基线对齐 baseline
<div class="flex-container container-demo align-items-baseline">
  <div class="item-demo" style="height:30px;font-size:18px;">1</div>
  <div class="item-demo" style="height:50px;font-size:12px;">2</div>
  <div class="item-demo" style="height:40px;font-size:24px;">3</div>
  <div class="item-demo" style="width:130px;height:100px;font-size:32px;">41333333</div>
</div>

填满容器 stretch
<div class="flex-container container-demo align-items-stretch" style="height: 100px;">
  <div class="item-demo" style="height:auto;">1</div>
  <div class="item-demo" style="height:auto;">2</div>
  <div class="item-demo" style="height:auto;">3</div>
  <div class="item-demo" style="height:auto;">4</div>
</div>

示例代码

[import:1-15, align-items.md](../../codes/flex/align-items.md)

### 多行侧轴方向对齐方式

与侧轴的起点对齐 flex-start

<div class="flex-container container-demo align-content-demo align-content-start">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

与侧轴的终点对齐 flex-end

<div class="flex-container container-demo align-content-demo align-content-end">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

与侧轴的中点对齐 center

<div class="flex-container container-demo align-content-demo align-content-center">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

与侧轴两端对齐 space-between

<div class="flex-container container-demo align-content-demo align-content-between">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

每行平均分布 space-around

<div class="flex-container container-demo align-content-demo align-content-around">
  <div class="item-demo">1</div>
  <div class="item-demo">2</div>
  <div class="item-demo">3</div>
  <div class="item-demo">4</div>
</div>

各行占满整个侧轴线 stretch

<div class="flex-container container-demo align-content-demo align-content-stretch">
  <div class="item-demo" style="height:auto;">1</div>
  <div class="item-demo" style="height:auto;">2</div>
  <div class="item-demo" style="height:auto;">3</div>
  <div class="item-demo" style="height:auto;">4</div>
</div>

示例代码

[import:1-15, align-content.md](../../codes/flex/align-content.md)
