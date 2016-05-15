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
