# css 动画 - transition 转换

## 概述

W3C标准中对css3的transition是这样描述的：“css的transition允许css的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变CSS的属性值。”

## 语法

```css
transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'>
|| <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> ||
<'transition-timing-function'> || <'transition-delay'>]]*
```

transition主要包含四个属性值
* 执行变换的属性：transition-property
* 变换延续的时间：transition-duration
* 在延续时间段，变换的速率变化transition-timing-function
* 变换延迟时间transition-delay

### transition-property

```css
transition-property ： none | all | [ <IDENT> ] [ ',' <IDENT> ]*
```

transition-property是用来指定当元素其中一个属性改变时执行transition效果，其主要有以下几个值
* none(没有属性改变)
* all（所有属性改变）这个也是其默认值
* indent（元素属性名）
*
当其值为none时，transition马上停止执行，当指定为all时，则元素产生任何属性值变化时都将执行transition效果，
ident是可以指定元素的某一个属性值。其对应的类型如下：

1、color: 通过颜色和透明度组合变换（每个数值处理）如：background-color,border-color,color,outline-color等css属性；

2、length: 真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,padding,outline-width,margin,min-width,min-height,max-width,max-height,line-height,height,border-width,border-spacing,background-position等属性；

3、percentage:真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,min-width,min-height,max-width,max-height,line-height,height,background-position等属性；

4、integer离散步骤（整个数字），在真实的数字空间，以及使用floor()转换为整数时发生 如：outline-offset,z-index等属性；

5、number真实的（浮点型）数值，如：zoom,opacity,font-weight,等属性；

6、transform

7、rectangle:通过x, y, width 和 height（转为数值）变换，如：crop

8、visibility: 离散步骤，在0到1数字范围之内，0表示“隐藏”，1表示完全“显示”,如：visibility

9、shadow: 作用于color, x, y 和 blur（模糊）属性,如：text-shadow

10、gradient: 通过每次停止时的位置和颜色进行变化。它们必须有相同的类型（放射状的或是线性的）和相同的停止数值以便执行动画,如：background-image

11、paint server (SVG): 只支持下面的情况：从gradient到gradient以及color到color，然后工作与上面类似

12、space-separated list of above:如果列表有相同的项目数值，则列表每一项按照上面的规则进行变化，否则无变化

13、a shorthand property: 如果缩写的所有部分都可以实现动画，则会像所有单个属性变化一样变化

具体什么css属性可以实现transition效果，在W3C官网中列出了所有可以实现transition效果的CSS属性值以及值的类型，大家可以点这里了解详情。这里需要提醒一点是，并不是什么属性改变都为触发transition动作效果，比如页面的自适应宽度，当浏览器改变宽度时，并不会触发transition的效果。但上述表格所示的属性类型改变都会触发一个transition动作效果。

### transition-duration

```css
 transition-duration ： <time> [, <time>]*
```

transition-duration是用来指定元素转换过程的持续时间，取值：<time>为数值，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括:before和:after伪元素。其默认值是0，也就是变换时是即时的。

### transition-timing-function

```css
transition-timing-function ： ease | linear | ease-in | ease-out | ease-in-out |
cubic-bezier(<number>, <number>, <number>, <number>) [, ease | linear | ease-in | ease-out |
ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)]*
```

取值：

transition-timing-function的值允许你根据时间的推进去改变属性值的变换速率，transition-timing-function有6个可选值

1、ease：（逐渐变慢）默认值，ease函数等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0).

2、linear：（匀速），linear 函数等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0).

3、ease-in：(加速)，ease-in 函数等同于贝塞尔曲线(0.42, 0, 1.0, 1.0).

4、ease-out：（减速），ease-out 函数等同于贝塞尔曲线(0, 0, 0.58, 1.0).

5、ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)

6、cubic-bezier：（该值允许你去自定义一个时间曲线）， 特定的 [cubic-bezier曲线](http://en.wikipedia.org/wiki/B%C3%A9zier_curve)。 (x1, y1, x2, y2)四个值特定于曲线上点P1和点P2。所有值需在[0, 1]区域内，否则无效。

### transition-delay

```css
transition-delay ： <time> [, <time>]*
```
transition-delay是用来指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果，其取值：<time>为数值，单位为s（秒）或者ms(毫秒)，其使用和transition-duration极其相似，也可以作用于所有元素，包括:before和:after伪元素。 默认大小是"0"，也就是变换立即执行，没有延迟。


## 用法

有时我们不只改变一个css效果的属性,而是想改变两个或者多个css属性的transition效果，那么我们只要把几个transition的声明串在一起，用逗号（“，”）隔开，然后各自可以有各自不同的延续时间和其时间的速率变换方式。例子

```css
a {
  -moz-transition: background 0.5s ease-in,color 0.3s ease-out;
  -webkit-transition: background 0.5s ease-in,color 0.3s ease-out;
  -o-transition: background 0.5s ease-in,color 0.3s ease-out;
  transition: background 0.5s ease-in,color 0.3s ease-out;
}
```

## 例子

### 例子一

例子一是在一个div中放置了几个小块，分别对应了transition-timing-function中的几种类型，我们在div的hover状态下，改变其部分属性，从而达到一种动画效果。以下是演示效果和示例代码


[点击查看效果](../../examples/css3/animation/transition/demo1.html)

示例代码

[import, demo1.html](../../examples/css3/animation/transition/demo1.html)


### 例子二

例子二是通过CSS3的transition模仿制作jQuery的slideshow效果


[点击查看效果](../../examples/css3/animation/transition/demo2.html)

示例代码

[import, demo2.html](../../examples/css3/animation/transition/demo2.html)


## 参考文章

* http://www.w3cplus.com/content/css3-transition
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
