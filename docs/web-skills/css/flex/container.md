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

```
.flex-container {
  -webkit-flex-direction: row | row-reverse | column | column-reverse; /* Safari */
  flex-direction: row | row-reverse | column | column-reverse;
}
```
他有4个值

```
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
```

**示例**

从左向右排列
<div style="display:flex;flex-direction: row; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
</div>

从右向左排列
<div style="display:flex;flex-direction: row-reverse; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
</div>

从上向下排列
<div style="display:flex;flex-direction: column; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
</div>

从下向上排列
<div style="display:flex;flex-direction: column-reverse; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
</div>

**注意：row和row-reverse依赖其写作模式，如果在rtl上下文方式下，他们都将分别被逆转。**

### flex-wrap
flex项目在flex容器中默认是只显示一行。如果希望控制flex项目在flex容器中按一行或多行排列，可以使用flex-wrap属性。

```
.flex-container{
  -webkit-flex-flow: nowrap | wrap | wrap-reverse; /* Safari */
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

他有三个值

* nowrap（默认）：不换行。Flex子元素在flex容器中显示成一行，flex子元素会自动缩减来适应flex容器的宽度。
* wrap：换行，第一行在上方。
* wrap-reverse：换行，第一行在下方。

**示例**

不换行 nowrap
<div style="display:flex;flex-wrap: nowrap; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;width:100px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

换行 wrap
<div style="display:flex;flex-wrap: wrap; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;width:100px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

换行 wrap 第一行在下方
<div style="display:flex;flex-wrap: wrap-reverse; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;width:100px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

**注意： 这些属性依赖于水平排列模式，在rtl上下文背景下，他们将分别被逆转。**

### flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap

```
.flex-container {
  -webkit-flex-flow: <flex-direction> || <flex-wrap>; /* Safari */
  flex-flow:         <flex-direction> || <flex-wrap>;
}
```

### justify-content
justify-content属性定义了项目在主轴上的对齐方式。

```
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

**示例**

左对齐 flex-start
<div style="display:flex;justify-content: flex-start; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

右对齐 flex-end
<div style="display:flex;justify-content: flex-end; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

居中 center
<div style="display:flex;justify-content: center; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

两端对齐 space-between
<div style="display:flex;justify-content: space-between; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

平均分布 space-around
<div style="display:flex;justify-content: space-around; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

### align-items
Flex子元素在容器侧轴对齐方式，类似于justify-content，只不过不是水平方向，而是纵向。
这个属性可以设置所有flex子元素对齐方式，并且包括匿名元素。

```
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

**示例**

侧轴的起点对齐 flex-start
<div style="display:flex;align-items: flex-start; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:40px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

侧轴的终点对齐 flex-end
<div style="display:flex;align-items: flex-end; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:40px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

侧轴的中点对齐 center
<div style="display:flex;align-items: center; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:50px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:40px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:70px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

按照子元素第一行文字的基线对齐 baseline
<div style="display:flex;align-items: baseline; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;font-size:18px;">1</div>
  <div style="width:30px;height:50px;border:1px solid darkcyan;text-align:center;font-size:12px;">2</div>
  <div style="width:30px;height:40px;border:1px solid darkcyan;text-align:center;font-size:24px;">3</div>
  <div style="width:130px;height:100px;border:1px solid darkcyan;text-align:center;font-size:32px;">41333333</div>
</div>

填满容器 stretch
<div style="display:flex;align-items: stretch; border: 1px solid darkcyan;padding: 10px;margin-bottom: 20px;height: 100px;">
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

### align-content

align-content 属性是指flex容器内的每行在flex容器中侧轴排列方式，类似于justify-content在主轴方向单个Flex子元素对齐方式。

**注意：这个属性只有当flex容器有多行时，flex子元素才生效，如果flex容器只有一行，这个属性没有效果。**
所以需要设置 flex-wrap: wrap; 或 flex-wrap: wrap-reverse;

```
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

**示例**

与侧轴的起点对齐 flex-start

<div style="display:flex;align-content: flex-start; border: 1px solid darkcyan;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

与侧轴的终点对齐 flex-end

<div style="display:flex;align-content: flex-end; border: 1px solid darkcyan;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

与侧轴的中点对齐 center

<div style="display:flex;align-content: center; border: 1px solid darkcyan;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

与侧轴两端对齐 space-between

<div style="display:flex;align-content: space-between; border: 1px solid darkcyan;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

每行平均分布 space-around

<div style="display:flex;align-content: space-around; border: 1px solid darkcyan;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;height:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

各行占满整个侧轴线 stretch

<div style="display:flex;align-content: stretch; border: 1px solid darkcyan;padding: 10px;
margin-bottom: 20px;width: 100px;height:200px;flex-wrap: wrap;">
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">1</div>
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">2</div>
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">3</div>
  <div style="width:30px;border:1px solid darkcyan;text-align:center;">4</div>
</div>

### Flexbox容器无效属性

* 所有column-*属性在flex容器上都不生效
* flex容器上不能使用::first-line和::first-letter伪元素
