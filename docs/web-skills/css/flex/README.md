# Flexbox 布局

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

```css
.flex-container {
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

如果你想将其设置为一个内联元素，可以像下面这样使用

```css
.flex-container {
  display: -webkit-inline-flex; /* Safari */
  display: inline-flex;
}
```

## Flexbox 容器属性

Flexbox 容器属性主要有以下六个属性

* flex-direction  设置flex容器的主轴方向
* flex-wrap 设置一行或多行布局
* flex-flow 是flex-direction属性和flex-wrap属性的简写形式
* justify-content 子元素主轴方向对齐方式
* align-items 子元素侧轴方向对齐方式
* align-content 多行侧轴方向对齐方式

### flex-direction

这个属性主要设置flex容器的主轴方向，指定flex子元素在flex容器中的排列方式。flex容器的主轴方向主要有水平和纵向两种。

```css
.flex-container {
  -webkit-flex-direction: row | row-reverse | column | column-reverse; /* Safari */
  flex-direction: row | row-reverse | column | column-reverse;
}
```

他有4个值

```css
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
```

示例

从左向右排列

<div style="display:flex;flex-direction: row; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
</div>

从右向左排列

<div style="display:flex;flex-direction: row-reverse; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
</div>

从上向下排列

<div style="display:flex;flex-direction: column; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
</div>

从下向上排列

<div style="display:flex;flex-direction: column-reverse; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
</div>

**注意：row和row-reverse依赖其写作模式，如果在rtl上下文方式下，他们都将分别被逆转。**

### flex-wrap

flex项目在flex容器中默认是只显示一行。如果希望控制flex项目在flex容器中按一行或多行排列，可以使用flex-wrap属性。

```css
.flex-container{
  -webkit-flex-flow: nowrap | wrap | wrap-reverse; /* Safari */
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

他有三个值

* nowrap（默认）：不换行。Flex子元素在flex容器中显示成一行，flex子元素会自动缩减来适应flex容器的宽度。
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。

示例

不换行 nowrap

<div style="display:flex;flex-wrap: nowrap; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;width:100px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

换行 wrap

<div style="display:flex;flex-wrap: wrap; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;width:100px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

换行 wrap 第一行在下方

<div style="display:flex;flex-wrap: wrap-reverse; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;width:100px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

**注意： 这些属性依赖于水平排列模式，在rtl上下文背景下，他们将分别被逆转。**

### flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

```css
.flex-container {
  -webkit-flex-flow: <flex-direction> || <flex-wrap>; /* Safari */
  flex-flow:         <flex-direction> || <flex-wrap>;
}
```

### justify-content

justify-content属性定义了项目在主轴上的对齐方式。

```css
.flex-container {
  -webkit-justify-content: flex-start | flex-end | center | space-between | space-around; /* Safari */
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

他有5 个属性值（以下说明和示例是在ltr上下文方式下）

* flex-start（默认值）：左对齐
* flex-end：右对齐
* center： 居中
* space-between：两端对齐，子元素之间的间隔相等，第一个和最后一个flex子元素向flex容器的边缘对齐。
* space-around：平均分布，Flex子元素前后相等的空间显示在flex容器中。所以，子元素之间的间隔会比子元素与边框的间隔大一倍。

示例

左对齐 flex-start

<div style="display:flex;justify-content: flex-start; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

右对齐 flex-end

<div style="display:flex;justify-content: flex-end; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

居中 center

<div style="display:flex;justify-content: center; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

两端对齐 space-between

<div style="display:flex;justify-content: space-between; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

平均分布 space-around

<div style="display:flex;justify-content: space-around; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

### align-items

Flex子元素在容器侧轴对齐方式，类似于justify-content，只不过不是水平方向，而是纵向。
这个属性可以设置所有flex子元素对齐方式，并且包括匿名元素。

```css
.flex-container {
  -webkit-align-items: flex-start | flex-end | center | baseline | stretch; /* Safari */
  align-items: flex-start | flex-end | center | baseline | stretch;;
}
```

他有 5 个属性值，以下假定侧轴是从上往下

* flex-start：侧轴的起点对齐。
* flex-end：侧轴的终点对齐。
* center：侧轴的中点对齐，即垂直居中
* baseline: 按照子元素第一行文字的基线对齐。
* stretch（默认值）：如果子元素未设置高度或设为auto，Flex子元素沿着flex容器侧轴方向填满整个flex容器高度
  如果侧轴是从左向右，则应该是指宽度。注意如果设置了高度或宽度，将不会被填满整个容器

示例

侧轴的起点对齐 flex-start

<div style="display:flex;align-items: flex-start; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:40px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

侧轴的终点对齐 flex-end

<div style="display:flex;align-items: flex-end; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:40px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

侧轴的中点对齐 center

<div style="display:flex;align-items: center; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:40px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

按照子元素第一行文字的基线对齐 baseline

<div style="display:flex;align-items: baseline; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;font-size:18px;">1</div>
  <div style="width:30px;height:50px;border:1px solid #2196f3;text-align:center;font-size:12px;">2</div>
  <div style="width:30px;height:40px;border:1px solid #2196f3;text-align:center;font-size:24px;">3</div>
  <div style="width:130px;height:100px;border:1px solid #2196f3;text-align:center;font-size:32px;">41333333</div>
</div>

填满容器 stretch

<div style="display:flex;align-items: stretch; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;height: 100px;">
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

### align-content

align-content 属性是指flex容器内的每行在flex容器中侧轴排列方式，类似于justify-content在主轴方向单个Flex子元素对齐方式。

**注意：这个属性只有当flex容器有多行时，flex子元素才生效，如果flex容器只有一行，这个属性没有效果。**
所以需要设置 flex-wrap: wrap; 或 flex-wrap: wrap-reverse;

```css
.flex-container {
  -webkit-align-content: flex-start | flex-end | center | space-between | space-around | stretch; /* Safari */
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

该属性有6个属性值

* flex-start：与侧轴的起点对齐。
* flex-end：与侧轴的终点对齐。
* center：与侧轴的中点对齐。
* space-between：与侧轴两端对齐，轴线之间的间隔平均分布。
* space-around：侧轴每行平均分布，轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
* stretch（默认值）：侧轴各行占满整个侧轴线。如果子元素未设置高度或设为auto，Flex子元素会沿着flex容器侧轴方向填满整个flex容器高度；
  如果设置高度，则每行按实际高度显示，并且多行会占满整个容器。需要说明一下侧轴是从左向右，则应该是指宽度；侧轴从上向下，则应该是指高度

示例

与侧轴的起点对齐 flex-start

<div style="display:flex;align-content: flex-start; border: 1px solid #2196f3;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

与侧轴的终点对齐 flex-end

<div style="display:flex;align-content: flex-end; border: 1px solid #2196f3;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

与侧轴的中点对齐 center

<div style="display:flex;align-content: center; border: 1px solid #2196f3;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

与侧轴两端对齐 space-between

<div style="display:flex;align-content: space-between; border: 1px solid #2196f3;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

每行平均分布 space-around

<div style="display:flex;align-content: space-around; border: 1px solid #2196f3;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

各行占满整个侧轴线 stretch

<div style="display:flex;align-content: stretch; border: 1px solid #2196f3;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">1</div>
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">2</div>
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

### Flexbox容器无效属性

* 所有column-*属性在flex容器上都不生效
* flex容器上不能使用::first-line和::first-letter伪元素

## Flexbox 子元素属性

Flexbox 布局用在子元素上的属性有以下6个

* order 属性是用来控制flex容器中flex子元素的排列顺序。默认情况下flex子元素在flex容器的顺序是按flex子元素出现的顺序排列的。
属性值为数值，数值越小，排列越靠前，默认为0。
* flex-grow 这个属性用来指定 flex子元素放大比例
* flex-shrink 定义了子元素的缩小比例
* flex-basis 属性定义了在分配多余空间之前，子元素占据的主轴空间（main size）
* flex 属性flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
* align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性

### order

属性是用来控制flex容器中flex子元素的排列顺序。默认情况下flex子元素在flex容器的顺序是按flex子元素出现的顺序排列的。
属性值为数值，数值越小，排列越靠前，默认为0。Flex子元素可以使用这个简单的属性来排序，而不需要重新修改HTML代码。

```css
.flex-item {
  -webkit-order: <integer>; /* Safari */
  order:         <integer>;
}
```

示例

<div style="display:flex;border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;justify-content:center;">
  <div style="border:1px solid #2196f3;text-align:center;order:10">order:10</div>
  <div style="border:1px solid #2196f3;text-align:center;order:3">order:3</div>
  <div style="border:1px solid #2196f3;text-align:center;order:-4">order:-4</div>
  <div style="border:1px solid #2196f3;text-align:center;order:7">order:7</div>
</div>

### flex-grow

这个属性用来指定 flex子元素放大比例，所有参与的子元素会根据 flex-grow 计算出对应的百分比来填充整个容器。
默认为0，如果有的子元素没有设置，即取默认值，则该子元素的宽度为其实际宽度。
如果所有flex子元素的flex-grow值相同，那么flex子元素在flex容器中具有相同的尺寸。

**注意：负数无效。**

```css
.flex-item {
  -webkit-flex-grow: <number>; /* Safari */
  flex-grow:         <number>;
}
```

示例

<div style="display:flex;border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;justify-content:center;">
  <div style="border:1px solid #2196f3;text-align:center;flex-grow:2;">1</div>
  <div style="border:1px solid #2196f3;text-align:center;flex-grow:2;">2</div>
  <div style="border:1px solid #2196f3;text-align:center;flex-grow:4;">3</div>
  <div style="border:1px solid #2196f3;text-align:center;flex-grow:2;">4</div>
</div>

### flex-shrink

flex-shrink属性定义了子元素的缩小比例，即如果空间不足，该子元素将缩小。数值越大，缩小越多。默认值为1。
如果设为0，则不缩放
如果所有子元素的flex-shrink属性都设为一样的值（0除外），当空间不足时，都将等比例缩小。
如果其中的部分子元素 flex-shrink属性为0，其他子元素都为1，则父容器空间不足时，属性值为0的子元素不缩小。
如果子元素的属性值部分或全部为0时，当父容器空间不足时，会溢出

**负值对该属性无效。**

```css
.flex-item {
  -webkit-flex-shrink: <number>; /* Safari */
  flex-shrink:         <number>;
}
```

示例

<div style="display:flex;border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;justify-content:center;width:750px;">
  <div style="border:1px solid #2196f3;text-align:center;width:300px;flex-shrink:0;">flex-shrink:0</div>
  <div style="border:1px solid #2196f3;text-align:center;width:300px;flex-shrink:1;">flex-shrink:1</div>
  <div style="border:1px solid #2196f3;text-align:center;width:300px;flex-shrink:2;">flex-shrink:2</div>
  <div style="border:1px solid #2196f3;text-align:center;width:300px;flex-shrink:3;">flex-shrink:3</div>
</div>

### flex-basis

flex-basis属性定义了在分配多余空间之前，子元素占据的主轴空间（main size）。
浏览器根据这个属性，计算主轴是否有多余空间，尽量大的填充该属性值，比如设为300px; 如果除去其他子元素后有大于等于300px 的空间，
则该子元素在主轴上为300px。如果除去其他子元素后有小于300px 的空间，则按父容器减去其他子元素主轴大小后的空间来设置。它的默认值为auto，即子元素的本来大小。

该属性用来指定其中某一子元素固定高度或宽度非常实用，如果空间大，按指定的大小来显示，如果空间小，则用剩余的空间大小来填充。

该属性值可以设为跟width或height属性一样的值（比如350px），主轴为水平指宽度，主轴为垂直指高度

```css
.flex-item {
  -webkit-flex-basis: auto | <width>; /* Safari */
  flex-basis:         auto | <width>;
}
```

示例

<div style="display:flex;border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;justify-content:center;">
  <div style="border:1px solid #2196f3;text-align:center;flex-basis:300px;">1</div>
  <div style="border:1px solid #2196f3;text-align:center;">2</div>
  <div style="border:1px solid #2196f3;text-align:center;">3</div>
  <div style="border:1px solid #2196f3;text-align:center;">4</div>
</div>

### flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
W3C鼓励使用简写方式，而不是单独写三个分离的属性，因为浏览器会推算相关值。

```css
.flex-item {
  -webkit-flex: none | auto | [ <flex-grow> <flex-shrink>? || <flex-basis> ]; /* Safari */
  flex:         none | auto | [ <flex-grow> <flex-shrink>? || <flex-basis> ];
}
```

### align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.flex-item {
  -webkit-align-self: auto | flex-start | flex-end | center | baseline | stretch; /* Safari */
  align-self:         auto | flex-start | flex-end | center | baseline | stretch;
}
```

示例

<div style="display:flex;align-items: flex-start; border: 1px solid #2196f3;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid #2196f3;text-align:center;align-self:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid #2196f3;text-align:center;align-self:flex-end;">2</div>
  <div style="width:30px;height:40px;border:1px solid #2196f3;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid #2196f3;text-align:center;">4</div>
</div>

### flex子元素无效属性

float，clear和vertical-align属性应用在flex子元素上将会无效

## Flexbox 兼容型

### 概述

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

### 参考文章

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
* [Flexbox 非常容易 制作 CSS 布局](http://www.tuicool.com/articles/quQVv2)

### 兼容性写法例子

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
  border: 1px solid #2196f3;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  width:30px;
  height:30px;
  border:1px solid #2196f3;
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

```html
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

.container-demo {
  border: 1px solid #2196f3;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  width:30px;
  height:30px;
  border:1px solid #2196f3;
  text-align:center;
}

</style>

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
```

### 多列和多行布局

没有找到更好的兼容型写法，有 box-lines 属性，但支持性不是很好

如果想要实现多行和多列布局，我们可以采取 float 布局来实现。也可以通过判断 flex-wrap 支持性来动态设置 css 样式

```javascript
  /**
   * 判断样式在浏览器中是否支持
   * @param styleProp
   * @returns {boolean}
   */
  function styleSupport(styleProp) {
    const prefix = ['webkit', 'moz', 'ms'];
    const $el = document.createElement('div');
    const styleText = $el.style;
    if (styleText[styleProp] !== undefined) {
      return true;
    }

    for (let i = 0; i < 3; i++) {
      const _styleProp = prefix[i] + styleProp[0].toUpperCase() + styleProp.substring(1);
      if (styleText[_styleProp] !== undefined) {
        return true;
      }
    }
    return false;
  }

  styleSupport('flexWrap');
```

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

```html
<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
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

.container-demo {
  border: 1px solid #2196f3;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  width:30px;
  height:30px;
  border:1px solid #2196f3;
  text-align:center;
}
</style>

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
```

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

```html
<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
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

.align-items-center {
  /*老版本语法*/
  -webkit-box-align: center;
  -moz-box-align: center;
  /*混合版本语法*/
  -ms-flex-align: center;
  /*新版本语法*/
  -webkit-align-items: flex-center; /* Safari */
  align-items: flex-center;
}

.container-demo {
  border: 1px solid #2196f3;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  width:30px;
  height:30px;
  border:1px solid #2196f3;
  text-align:center;
}

</style>

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
```

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

```html
<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
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
  border: 1px solid #2196f3;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  width:30px;
  height:30px;
  border:1px solid #2196f3;
  text-align:center;
}

.align-content-demo {
  width: 100px;
  height:200px;
  -webkit-flex-flow: wrap; /* Safari */
  flex-wrap: wrap;
}

</style>

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
```

### 子元素兼容性写法

<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
}

.container-demo {
  border: 1px solid #2196f3;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  border:1px solid #2196f3;
  text-align:center;
}

.flex-order-10{
  /*老版本语法*/
  -webkit-box-ordinal-group: 10;
  -moz-box-ordinal-group: 10;
  /*IE 10 语法*/
  -ms-flex-order: 10;
  /*新版本语法*/
  -webkit-order: 10; /* Safari */
  order: 10;
}

.flex-order-3{
  /*老版本语法*/
  -webkit-box-ordinal-group: 3;
  -moz-box-ordinal-group: 3;
  /*IE 10 语法*/
  -ms-flex-order: 3;
  /*新版本语法*/
  -webkit-order: 3; /* Safari */
  order: 3;
}

.flex-order--4{
  /*老版本语法*/
  -webkit-box-ordinal-group: -4;
  -moz-box-ordinal-group: -4;
  /*IE 10 语法*/
  -ms-flex-order: -4;
  /*新版本语法*/
  -webkit-order: -4; /* Safari */
  order: -4;
}

.flex-order-7{
  /*老版本语法*/
  -webkit-box-ordinal-group: 7;
  -moz-box-ordinal-group: 7;
  /*IE 10 语法*/
  -ms-flex-order: 7;
  /*新版本语法*/
  -webkit-order: 7; /* Safari */
  order: 7;
}

.box-flex-1{
  -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;         /* OLD - Firefox 19- */
  width: 10%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 1;          /* Chrome */
  -ms-flex: 1;              /* IE 10 */
  flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.box-flex-2{
  -webkit-box-flex: 2;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 2;         /* OLD - Firefox 19- */
  width: 20%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 2;          /* Chrome */
  -ms-flex: 2;              /* IE 10 */
  flex: 2;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

.box-flex-6{
  -webkit-box-flex: 6;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 6;         /* OLD - Firefox 19- */
  width: 60%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 6;          /* Chrome */
  -ms-flex: 6;              /* IE 10 */
  flex: 6;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}

</style>

### order 属性是用来控制flex容器中flex子元素的排列顺序

<div class="flex-container container-demo">
  <div class="item-demo flex-order-10">order:10</div>
  <div class="item-demo flex-order-3">order:3</div>
  <div class="item-demo flex-order--4">order:-4</div>
  <div class="item-demo flex-order-7">order:7</div>
</div>

示例代码

```html
<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
}

.container-demo {
  border: 1px solid darkcyan;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  border:1px solid darkcyan;
  text-align:center;
}

.flex-order-10{
  /*老版本语法*/
  -webkit-box-ordinal-group: 10;
  -moz-box-ordinal-group: 10;
  /*IE 10 语法*/
  -ms-flex-order: 10;
  /*新版本语法*/
  -webkit-order: 10; /* Safari */
  order: 10;
}

.flex-order-3{
  /*老版本语法*/
  -webkit-box-ordinal-group: 3;
  -moz-box-ordinal-group: 3;
  /*IE 10 语法*/
  -ms-flex-order: 3;
  /*新版本语法*/
  -webkit-order: 3; /* Safari */
  order: 3;
}

.flex-order--4{
  /*老版本语法*/
  -webkit-box-ordinal-group: -4;
  -moz-box-ordinal-group: -4;
  /*IE 10 语法*/
  -ms-flex-order: -4;
  /*新版本语法*/
  -webkit-order: -4; /* Safari */
  order: -4;
}

.flex-order-7{
  /*老版本语法*/
  -webkit-box-ordinal-group: 7;
  -moz-box-ordinal-group: 7;
  /*IE 10 语法*/
  -ms-flex-order: 7;
  /*新版本语法*/
  -webkit-order: 7; /* Safari */
  order: 7;
}
</style>

<div class="flex-container container-demo">
  <div class="item-demo flex-order-10">order:10</div>
  <div class="item-demo flex-order-3">order:3</div>
  <div class="item-demo flex-order--4">order:-4</div>
  <div class="item-demo flex-order-7">order:7</div>
</div>
```

### flex 属性flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto

下面以 flex 来给出其兼容性写法，注意： <span style="color: #F10C49">**子元素必须是 display 为 block**</span>

<div class="flex-container container-demo">
  <div class="item-demo box-flex-1">flex:1</div>
  <div class="item-demo box-flex-2">flex:2</div>
  <div class="item-demo box-flex-6">flex:6</div>
</div>

示例代码

```html
<style>
.flex-container {
  display: -webkit-box;  /* 老版本语法: Safari 3.1-6,  iOS 6-, Android browser, older WebKit browsers.  */
  display: -moz-box;    /* 老版本语法: Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;  /* 混合版本语法: IE 10 */
  display: -webkit-flex;  /* 新版本语法： Chrome 21+ */
  display: flex;       /* 新版本语法： Opera 12.1, Firefox 22+ */
}

.container-demo {
  border: 1px solid darkcyan;
  padding: 10px;
  margin-bottom: 20px;
}

.item-demo {
  border:1px solid darkcyan;
  text-align:center;
}

.box-flex-1{
  -webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;         /* OLD - Firefox 19- */
  width: 10%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 1;          /* Chrome */
  -ms-flex: 1;              /* IE 10 */
  flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}


.box-flex-2{
  -webkit-box-flex: 2;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 2;         /* OLD - Firefox 19- */
  width: 20%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 2;          /* Chrome */
  -ms-flex: 2;              /* IE 10 */
  flex: 2;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}


.box-flex-6{
  -webkit-box-flex: 6;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 6;         /* OLD - Firefox 19- */
  width: 60%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 6;          /* Chrome */
  -ms-flex: 6;              /* IE 10 */
  flex: 6;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */
}
</style>

<div class="flex-container container-demo">
  <div class="item-demo box-flex-1">flex:1</div>
  <div class="item-demo box-flex-2">flex:2</div>
  <div class="item-demo box-flex-6">flex:6</div>
</div>
```

## 参考资料

* [终极Flexbox属性查询列表](http://www.w3cplus.com/css3/css3-flexbox-cheat-sheet.html)
* [一个完整的Flexbox指南](http://www.w3cplus.com/css3/a-guide-to-flexbox-new.html)
