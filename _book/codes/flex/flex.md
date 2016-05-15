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

<div class="flex-container container-demo">
  <div class="item-demo box-flex-1">flex:1</div>
  <div class="item-demo box-flex-2">flex:2</div>
  <div class="item-demo box-flex-6">flex:6</div>
</div>
