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
