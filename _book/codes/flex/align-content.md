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
