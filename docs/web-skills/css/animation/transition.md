# 转换(transition)

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

transition-duration是用来指定元素转换过程的持续时间，取值：&lt;time&gt;为数值，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括:before和:after伪元素。其默认值是0，也就是变换时是即时的。

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

transition-delay是用来指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果，其取值：&lt;time>为数值，单位为s（秒）或者ms(毫秒)，其使用和transition-duration极其相似，也可以作用于所有元素，包括:before和:after伪元素。 默认大小是"0"，也就是变换立即执行，没有延迟。

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

[点击查看效果](/examples/css/animation/transition/demo1.html)

示例代码

```html
<!DOCTYPE html>
<html lang="zh_cn">
<head>
  <meta charset="UTF-8">
  <title>transition 例子</title>
  <style>
    #timings-demo {
      border: 1px solid #ccc;
      padding: 10px;
      height: 400px;
    }

    .demo-box {
      width: 100px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background: #96c;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-box-shadow: inset 0 0 5px rgba(102, 153, 0,0.5);
      -webkit-box-shadow: inset 0 0 5px rgba(102, 153, 0,0.5);
      box-shadow: inset 0 0 5px rgba(102, 153, 0,0.5);
      margin-bottom: 10px;
    }
    /*ease效果：*/
    #ease {
      -moz-transition: all 5s ease 0.3s;
      -webkit-transition: all 5s ease 0.3s;
      -o-transition: all 5s ease 0.3s;
      transition: all 5s ease 0.3s;
      background: #f36;
    }
    /*ease-in效果：*/
    #ease-in {
      -moz-transition: all 3s ease-in 0.5s;
      -webkit-transition: all 3s ease-in 0.5s;
      -o-transition: all 3s ease-in 0.5s;
      transition: all 3s ease-in 0.5s;
      background: #369;
    }
    /*ease-out效果：*/
    #ease-out {
      -moz-transition: all 5s ease-out 0s;
      -webkit-transition: all 5s ease-out 0s;
      -o-transition: all 5s ease-out 0s;
      transition: all 5s ease-out 0s;
      background: #636;
    }
    /*ease-in-out效果：*/
    #ease-in-out {
      -moz-transition: all 1s ease-in-out 2s;
      -webkit-transition: all 1s ease-in-out 2s;
      -o-transition: all 1s ease-in-out 2s;
      transition: all 1s ease-in-out 2s;
      background: #3e6;
    }
    /*linear效果：*/
    #linear {
      -moz-transition: all 6s linear 0s;
      -webkit-transition: all 6s linear 0s;
      -o-transition: all 6s linear 0s;
      transition: all 6s linear 0s;
      background: #999;
    }
    /*cubic-bezier效果：*/
    #cubic-bezier {
      -moz-transition: all 4s cubic-bezier 1s;
      -webkit-transition: all 4s cubic-bezier 1s;
      -o-transition: all 4s cubic-bezier 1s;
      transition: all 4s cubic-bezier 1s;
      background: #6d6;
    }
    /*hover状态下 demo-box产生属性变化*/
    #timings-demo:hover .demo-box {
      -moz-transform: rotate(360deg) scale(1.2);
      -webkit-transform: rotate(360deg) scale(1.2);
      -o-transform: rotate(360deg) scale(1.2);
      transform: rotate(360deg) scale(1.2);
      background: #369;
      border: 1px solid rgba(255,230,255,08);
      -moz-border-radius: 25px;
      -webkit-border-radius: 25px;
      border-radius: 25px;
      margin-left: 80%;
      height: 30px;
      line-height: 30px;
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
<h2>鼠标移上查看效果</h2>
<div id="timings-demo">
  <div id="ease" class="demo-box">Ease</div>
  <div id="ease-in" class="demo-box">Ease-in</div>
  <div id="ease-out" class="demo-box">Ease-out</div>
  <div id="ease-in-out" class="demo-box">Ease-in-out</div>
  <div id="linear" class="demo-box">Linear</div>
  <div id="cubic-bezier" class="demo-box">Cubic-bezier</div>
</div>
</body>
</html>
```

### 例子二

例子二是通过CSS3的transition模仿制作jQuery的slideshow效果

[点击查看效果](/examples/css/animation/transition/demo2.html)

示例代码

```html
<!DOCTYPE html>
<html lang="zh_cn">
<head>
  <meta charset="UTF-8">
  <title>transition 例子</title>
  <style>
    #demoSliderContainer {
      background: #000;
      -moz-box-shadow: 1px 1px 5px #000;
      -webkit-box-shadow: 1px 1px 5px #000;
      box-shadow: 1px 1px 5px #000;
      padding: 0;
      overflow: auto;
      margin: 10px auto;
      width: 900px;
    }

    #demoSlider {
      border: 1px solid #000;
      border-width: 5px 5px 0;
      height: 500px;
      margin: 0 auto;
      width: 880px;
      overflow: hidden;
      position: relative;
    }

    .slide-images .slide-image {
      position: absolute;
    }

    .slide-images .slide-image img {
      z-index: 2;
    }

    .slide-images .slide-image span {
      background: rgba(0,0,0,0.3);
      -moz-border-radius: 5px 0 0 0;
      -webkit-border-radius: 5px 0 0 0;
      border-radius: 5px 0 0 0;
      bottom: 4px;
      color: rgba(255,255,255,0.8);
      font-size: 14px;
      font-weight: bold;
      padding: 5px 10px;
      position: absolute;
      right: 0;
      z-index: 3;
    }
    .slide-images .slide-image.current img {
      z-index: 12;
    }

    .slide-images .slide-image.current span {
      z-index: 13;
    }

    #demoSliderContainer .options {
      padding: 3px 10px;
      text-align: center;
    }
    #demoSliderContainer .options a {
      color: #91BECC;
      font-family: Georgia,Serif;
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;
    }
    #demoSliderContainer .options a:hover {
      color: #D3E5EB;
    }
    #demoSliderContainer .slide-pager a {
      -moz-transition-duration: 0.5s;
      -webkit-transition-duration: 0.5s;
      -o-transition-duration: 0.5s;
      transition-duration: 0.5s;
    }
    #demoSliderContainer .slide-pager a.current {
      background-color: #91BECC;
      border-radius: 5px 5px 5px 5px;
      color: black;
      padding: 0 4px;
    }
    #demoSliderContainer .options .prevSlide {
      float: left;
    }
    #demoSliderContainer .options .nextSlide {
      float: right;
    }

    /*transition effect*/
    .slide-images .slide-image,
    .slide-images .slide-image img {
      -moz-transition-duration: 1.5s;
      -webkit-transition-duration: 1.5s;
      -otransition-duration: 1.5s;
      transition-duration: 1.5s;
    }

    .slide-images.transition-opacity .slide-image {
      opacity: 0;
      width: 0;
    }

    .slide-images.transition-opacity .slide-image.current {
      opacity: 1;
      width: 500px;
    }

    .slide-images.transition-left .slide-image {
      left: -500px;
      opacity: 0;
    }

    .slide-images.transition-left .slide-image.current {
      left: 0;
      opacity: 1;
    }

    .slide-images.transition-right .slide-image {
      right: -880px;
      opacity: 0;
    }
    .slide-images.transition-right .slide-image.current {
      right: 0;
      opacity: 1;
    }


    .slide-images.transition-top .slide-image {
      opacity: 0;
      top: -500px;
    }
    .slide-images.transition-top .slide-image.current {
      opacity: 1;
      top: 0;
    }

    .slide-images.transition-bottom .slide-image {
      opacity: 0;
      bottom: -500px;
    }
    .slide-images.transition-bottom .slide-image.current {
      opacity: 1;
      bottom: 0;
    }

    .slide-images.transition-cornerzoom .slide-image {
      opacity: 0;
    }

    .slide-images.transition-cornerzoom .slide-image.current {
      opacity: 1;
    }

    .slide-images.transition-cornerzoom .slide-image img {
      width: 0;
    }

    .slide-images.transition-cornerzoom .slide-image.current img {
      width: 550px;
    }

    .slide-images.transition-zoom .slide-image {
      opacity: 0;
    }
    .slide-images.transition-zoom .slide-image.current {
      opacity: 1;
    }
    .slide-images.transition-zoom .slide-image img {
      left: -440px;
      position: relative;
      top: -250px;
      width: 1100px;
    }
    .slide-images.transition-zoom .slide-image.current img {
      left: 0;
      top: 0;
      width: 550px;
    }

    .slide-images.transition-dezoom .slide-image {
      -moz-box-shadow: 2px 2px 8px black;
      -webkit-box-shadow: 2px 2px 8px black;
      box-shadow: 2px 2px 8px black;
      opacity: 0;
    }
    .slide-images.transition-dezoom .slide-image.current {
      opacity: 1;
    }
    .slide-images.transition-dezoom .slide-image img {
      left: 440px;
      position: relative;
      top: 250px;
      width: 0;
    }
    .slide-images.transition-dezoom .slide-image.current img {
      left: 0;
      top: 0;
      width: 880px;
    }

    .slide-images.transition-rotate .slide-image {
      opacity: 0;
    }
    .slide-images.transition-rotate .slide-image.current {
      opacity: 1;
    }
    .slide-images.transition-rotate .slide-image img {
      width: 880;
      height: 500px;
      position: relative;
      left: -880px;
      top: -500px;

    }
    .slide-images.transition-rotate .slide-image.current img {
      width: 550px;
      height: 220px;
      left: 0;
      top: 0;
      -moz-transform: rotate(1440deg);
      -webkit-transform: rotate(1440deg);
      -o-transform: rotate(1440deg);
      transform: rotate(1440deg);
    }


    #options {
      margin: 20px auto;
      padding: 5px;
      width: 800px;
    }
  </style>
</head>
<body>
<div id="demoSliderContainer">
  <ul id="demoSlider" class="slide-images">
    <li class="slide-image">
      <img src="./images/1.png" alt="1" />
      <span>1</span>
    </li>
    <li class="slide-image">
      <img src="./images/2.jpg" alt="2" />
      <span>2</span>
    </li>
    <li class="slide-image">
      <img src="./images/3.jpg" alt="3" />
      <span>3</span>
    </li>
    <li class="slide-image">
      <img src="./images/4.png" alt="4" />
      <span>4</span>
    </li>
  </ul>
  <div class="options">
    <a href="javascript:;" class="prevSlide">Prev</a>
      <span class="slide-pager">
        <a href="" class="javascript:;">1</a>
        <a href="" class="javascript:;">2</a>
        <a href="" class="javascript:;">3</a>
        <a href="" class="javascript:;">4</a>
      </span>
    <a href="javascript:;" class="nextSlide">Next</a>
  </div>
</div>
<div id="options">
  <label for="transitionEffect">Transition effect :</label>
  <select id="transitionEffect">
    <option value="transition-opacity">opacity fade</option>
    <option value="transition-left">left slide</option>
    <option value="transition-right">right slide</option>
    <option value="transition-top">top slide</option>
    <option value="transition-bottom">bottom slide</option>
    <option value="transition-zoom">zoom</option>
    <option value="transition-dezoom">de-zoom</option>
    <option value="transition-cornerzoom">corner zoom</option>
    <option value="transition-rotate">rotate</option>
  </select>

  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function(){
      $(".slide-images").each(function(){
        var slider = $(this);
        var slides = $(".slide-image",slider);
        var sliderPages = $(".slide-pager");

        //Slide Navigation

        var currentSlideNum = 0;
        slides.removeClass("current");
        slides.eq(currentSlideNum).addClass("current");
        sliderPages.each(function(){
          var pages = $("a",this);
          pages.removeClass("current");
          pages.eq(currentSlideNum).addClass("current");
        });

        var goToSlide = function(slideNum) {
          slides.eq(currentSlideNum).removeClass("current");
          slides.eq(slideNum).addClass("current");
          sliderPages.each(function(){
            var pages = $("a", this);
            pages.eq(currentSlideNum).removeClass("current");
            pages.eq(slideNum).addClass("current");
          });
          currentSlideNum = slideNum;
        };

        var nextSlide = function() {
          var nextSlideNum = currentSlideNum + 1;
          if(nextSlideNum >= slides.size())
            nextSlideNum = 0;
            goToSlide(nextSlideNum);

        };

        var prevSlide = function() {
          var prevSlideNum = currentSlideNum - 1;
          if(prevSlideNum < 0)
            prevSlideNum = slides.size() - 1;
            goToSlide(prevSlideNum);

        };

        //transition effects
        var setTransitionEffect = function(transitionEffect) {
          slider.attr("class","slide-images "+ transitionEffect);
        };

        $("#transitionEffect").change(function(){
          setTransitionEffect($(this).val());
        }).change();

        //Navigation binding

        $(".prevSlide").click(prevSlide);
        $(".nextSlide").click(nextSlide);
        $(".slide-pager a").each(function(i){
          if(i >= slides.size()) return false;
          $(this).click(function(){
            goToSlide(i);
          });
        });

        //Auto next slide

        var lastHumanNav = 0;
        $(".prevSlide, .nextSlide, .slide-pager a").click(function(){
          lastHumanNav = new Date().getTime();
        });
        setInterval(function(){
          var now = new Date().getTime();
          if(now - lastHumanNav > 5000)
            nextSlide();
        },5000);
      });
    });

</script>
</div>
</body>
</html>
```

## 参考文章

* <http://www.w3cplus.com/content/css3-transition>
* <https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition>
* <https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions>
