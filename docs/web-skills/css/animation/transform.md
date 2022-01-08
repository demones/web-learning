# css 动画 - transform 变形

## transform

### 语法

```css
transform: none;
transform: matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0);
transform: translate(12px, 50%);
transform: translateX(2em);
transform: translateY(3in);
transform: scale(2, 0.5);
transform: scaleX(2);
transform: scaleY(0.5);
transform: rotate(0.5turn);
transform: skew(30deg 30deg);
transform: skewX(30deg);
transform: skewY(1.07rad);
transform: matrix3d(1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0);
transform: translate3d(12px, 50%, 3em);
transform: translateZ(2px);
transform: scale3d(2.5, 1.2, 0.3);
transform: scaleZ(0.3);
transform: rotate3d(1, 2.0, 3.0, 10deg);
transform: rotateX(10deg);
transform: rotateY(10deg);
transform: rotateZ(10deg);
transform: perspective(17px);

transform: translateX(10px) rotate(10deg) translateY(5px);
```

```css
transform:  <transform-function> [<transform-function>]* | none
```

### 说明

从上面的语法可以看出，我们可以为 transform 设置一个或多个属性函数值，还可以加上前缀兼容不同的浏览器。
以下把 transform 属性值归类为：

* 矩阵变形matrix，包括 matrix matrix3d
* 移动translate，包括 translate translateX translateY translateZ translate3d
* 缩放scale，包括 scale scaleX scaleY scaleZ scale3d
* 旋转rotate，包括 rotate rotateX rotateY rotateZ rotate3d 单位为 deg（角度）,turn, rad
* 扭曲（倾斜）skew，包括 skew skewX skewY 单位为 deg（角度）,turn, rad
* perspective 开启激活 3D 效果

### [兼容性](http://caniuse.com/#search=transform)

<iframe height="380px" src="http://caniuse.com/#search=transform" width="100%"></iframe>

### 例子

[各种属性值实例](../../examples/css3/animation/transform/transform.html)

transform运用多个属性值例子

```css
.transform-multi a{
   width: 100px;
   padding: 5px;
   background: red;
   display: block;
 }
 .transform-multi a:hover {  
   -moz-transform: rotate(45deg) scale(0.8,1.2) skew(60deg,-30deg);
   -webkit-transform: rotate(45deg) scale(0.8,1.2) skew(60deg,-30deg);
   -o-transform: rotate(45deg) scale(0.8,1.2) skew(60deg,-30deg);
   -ms-transform: rotate(45deg) scale(0.8,1.2) skew(60deg,-30deg);
   transform: rotate(45deg) scale(0.8,1.2) skew(60deg,-30deg);
 }
```

这里需要注意的是使用多个属性值时，其之间不能用逗号（,）分隔，必须使用空格分隔。


## transform-origin

transform-origin CSS属性可以更改一个元素变形的原点（基点），默认为中心，即 50% 50% 0

### 语法

```css
/* 单值语法 */
transform-origin: 2px;
transform-origin: bottom;

/* 双值语法 */
/* 用两个数字值先水平后垂直，用一个数值一关键字或两关键字不强求顺序 */
transform-origin: 3cm 2px;   /* x-offset y-offset */
transform-origin: 2px left;  /* y-offset x-offset-keyword */
transform-origin: left 2px;  /* x-offset-keyword y-offset */
transform-origin: right top; /* x-offset-keyword y-offset-keyword */
transform-origin: top right; /* y-offset-keyword x-offset-keyword */

/* 三值语法 */
transform-origin: 2px 30% 10px;     /* x-offset y-offset z-offset */
transform-origin: 2px left 10px;    /* y-offset x-offset-keyword z-offset */
transform-origin: left 5px -3px;    /* x-offset-keyword y-offset z-offset */
transform-origin: right bottom 2cm; /* x-offset-keyword y-offset-keyword z-offset */
transform-origin: bottom right 2cm; /* y-offset-keyword x-offset-keyword z-offset */
```

### 说明
定义的基点值偏移量是指：
* x-offset 距离盒模型的左侧的<length>或<percentage>偏移值。
* y-offset 距离盒模型的顶部的<length>或<percentage>偏移值。
* z-offset 定义变形中心距离用户视线（z=0处）的<length>（不能是百分比 &lt;percentage&gt;）偏移值。
* 可以指定负值


## transform-style

### 语法

```
transform-style: flat | preserve-3d
```

### 说明
transform-style属性可以指定该元素在三维空间（3D）中展示，还是在二维空间中展示。有两个属性值：flat和preserve-3d，默认为 flat。

其中flat值为默认值，表示所有子元素在2D平面呈现。preserve-3d表示所有子元素在3D空间中呈现。

也就是说，如果对一个元素设置了transform-style的值为flat，则该元素的所有子元素都将被平展到该元素的2D平面中进行呈现。沿着X轴或Y轴方向旋转该元素将导致位于正或负Z轴位置的子元素显示在该元素的平面上，而不是它的前面或者后面。如果对一个元素设置了transform-style的值为preserve-3d，它表示不执行平展操作，他的所有子元素位于3D空间中。

transform-style属性需要设置在父元素中，并且高于任何嵌套的变形元素。

[实例](../../examples/css3/animation/transform/transform-style.html)

从上面的实例可以看出，当元素.rotate设置了flat值时，其子元素img不会根据translateZ()值摊开，而在同一平面旋转；当元素.rotate设置了preserve-3d值时，其子元素img会根据translateZ()值摊开，不再会堆叠在一起。

有一点需要特别注意，如果你的元素设置了transform-style值为preserve-3d，就不能为了防止子元素溢出容器而设置overflow值为hidden，如果设置了overflow:hidden同样可以迫死子元素出现在同一平面（和元素设置了transform-style为flat效果一样）。


## perspective

### 说明
perspective 属性对于3D变形来说至关重要。该属性会设置查看者的位置，并将可视内容映射到一个视锥上，继而投到一个2D视平面上。如果不指定透视 perspective，则Z轴空间中的所有点将平铺到同一个2D视平面中，并且变换结果中将不存在景深效果。

上面的描述可能让人难以理解，其实对于perspective属性，我们可以简单的理解为视距，用来设置用户和元素3D空间Z平面之间的距离。而其效应由他的值来决定，值越小，用户与3D空间Z平面距离越近，3D视觉效果更令人印象深刻；反之，值越大，用户与3D空间Z平面距离越远，3D视觉效果就很小。

[实例](../../examples/css3/animation/transform/perspective.html)

从上面的例子中可以看出，当没有设置 perspective 时，3d 属性值是不起作用的。

### 语法
我们再看一下 perspective 的语法

```
perspective：none | <length>

/* Keyword value */
perspective: none;

/* <length> values */
perspective: 20px;  
perspective: 3.5em;

/* Global values */
perspective: inherit;
perspective: initial;
perspective: unset;
```

perspective属性包括两个属性值：none和具有单位的长度值。其中perspective属性的默认值为none，表示从无限的角度来看3D物体，所以看上去是平的（2D）。
另一个值<length>接受一个长度单位大于0的值。而且其单位不能为百分比值，也不能为负值或0。<length>值越大，角度出现的越远，从而创建一个相当低的强度和非常小的3D空间变化。反之，此值越小，角度出现的越近，从而创建一个高强度的角度和一个大型3D变化。


比如你站在10英尺和1000英尺的地方看一个10英尺的立方体。在10英尺的地方，你距离立方体是一样的尺寸。因此视角转变远远大于站在1000英尺处的，立体尺寸是你距离立方体距离的百分之一。同样的思维适用于perspective的<length>值。我们一起来看一个实例，来加强这方面的理解：

[实例2](../../examples/css3/animation/transform/perspective2.html)


### perspective 属性 与 transform 属性函数值 perspective 的区别

在3D变形中，除了perspective属性可以激活一个3D空间之外，在3D变形的函数中的perspective()也可以激活3D空间。
他们不同的地方是：perspective 属性是用在舞台元素上（变形元素们的共同父元素）； transform: perspective()是用在当前变形元素上，并且可以与其他的transform函数一起使用。

```css
.stage {
    perspective: 600px
}
```

可写成：

```css
.stage .box {
    transform: perspective(600px);
}

```

看以下例子：

[实例3](../../examples/css3/animation/transform/perspective3.html)

从上面的例子可以看出，虽然书写的形式，属性名称不一致，但是效果却一样。

下面说明一下这两个属性的不同之处

虽然perspective属性和perspective()函数所起的功能是一样的，但其取值以及以运用的对像有所不同

* perspective属性可以取值为none或长度值（大于0的值）；而perspective()函数取值只能大于0，如果取值为0或比0小的值，将无法激活3D空间；
* perspective属性用于变形对像父元素；而perspective()函数用于变形对像自身，并可以和transform其他函数一起使用。

## perspective-origin
利用 perspective 设置3D 效果，默认情况下，消失点位于元素的中心，但是可以通过设置perspective-origin属性来改变其位置。它实际上设置了X轴和Y轴位置，在该位置观看者好像在观看该元素的子元素。

### 语法

```
perspective-origin：[<percentage> | <length> | left | center | right | top | bottom] |
 [[<percentage> | <length> | left | center | right] && [<percentage> | <length> | top |
  center | bottom]]
```

该属性的默认值为“50% 50%”(也就是center)，其也可以设置为一个值，也可以设置为两个长度值：

* 第一个长度值指定相对于元素的包含框的X轴上的位置。它可以是长度值（以受支持的长度单位表示）、百分比或以下三个关键词之一：left（表示在包含框的X轴方向长度的0%），center（表示中间点）,或right（表示长度的100%）。
* 第二个长度值指定相对于元素的包含框的Y轴上的位置。它可以是长度值、百分比或以下三个关键词之一：top（表示在包含框的Y轴方向长度的0%），center（表示中间点），或bottom（表示长度的100%）。

注意：perspective-origin属性应该定义在父元素上。通常perspective-origin属性本身不做任何事情，它必须被定义在设置了perspective属性的元素上。换句话说，perspective-origin属性需要与perspective属性结合起来使用，以便将视点移至元素的某个位置

### 示例

[例子](../../examples/css3/animation/transform/perspective3.html)

该示例来至于 https://css-tricks.com/almanac/properties/p/perspective-origin/

## backface-visibility

backface-visibility 属性指定当元素背面朝向观察者时是否可见。元素的背面总是透明的，当其朝向观察者时，显示正面的镜像。

在某些情况下，我们不希望元素内容在背面可见，比如实现翻牌效果。

因为2D变换无透视效果，故该属性对2D变换无效。

### 语法

```
backface-visibility: visible
backface-visibility: hidden
```

* visible 表示背面可见，允许显示正面的镜像，默认值
* hidden 表示背面不可见。

简单点来说，backface-visibility 属性可用于隐藏内容的背面。默认情况下，背面可见，这意味着即使在翻转后，旋转的内容仍然可见。但当 backface-visibility 设置为hidden时，旋转后内容将隐藏，因为旋转后正面将不再可见。该功能可帮助您模拟多面的对象，例如下例中使用的纸牌。通过将backface-visibility设置为hidden，您可以轻松确保只有正面可见。

[扑克牌翻转例子](../../examples/css3/animation/transform/backface-visibility.html)

下面我们再看一个例子，通过3D立方体的展示来说明 backface-visibility 的用法

[3D立方体](../../examples/css3/animation/transform/backface-visibility2.html)

## 3D 翻转例子
该例子来至于互联网
[3D翻转](../../examples/css3/animation/transform/Cubelnformation/)

## 参考文章

* https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transforms/Using_CSS_transforms
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin
* https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility
* http://www.w3cplus.com/content/css3-transform
* http://www.w3cplus.com/css3/transform-origin.html
* http://www.w3cplus.com/css3/transform-basic-property.html
* http://www.w3cplus.com/css3/css3-2d-transform.html
* http://www.w3cplus.com/css3/css3-3d-transform.html
