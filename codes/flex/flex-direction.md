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
