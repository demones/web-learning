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
