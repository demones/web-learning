## 兼容性写法例子续

上一节主要给出了盒子弹性布局容器的写法，这一节主要列举子元素兼容性写法

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

[import, order.md](../../codes/flex/order.md)


### flex 属性flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto

<div class="flex-container container-demo">
  <div class="item-demo box-flex-1">flex:1</div>
  <div class="item-demo box-flex-2">flex:2</div>
  <div class="item-demo box-flex-6">flex:6</div>
</div>

示例代码

[import, flex.md](../../codes/flex/flex.md)

其他属性兼容性写法不是很全，这里就不罗列了
