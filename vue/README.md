# Vue 知识点

## 样式局部作用域调整组件样式写法
使用关键语法参数 ::v-deep

```html
<style lang='scss' scoped>
/* stylelint-disable selector-pseudo-element-no-unknown */
.biz-box {
  ::v-deep .col-3 {
    padding-bottom: 0;
  }
}
</style>
```
