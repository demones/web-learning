# vue 知识点

## 数据绑定

:value 和 v-model 只能用在表单元素上

```html
  <!-- 普通写法 -->
  单向数据绑定：<input type="text" v-bind:value="name"><br/>
  双向数据绑定：<input type="text" v-model:value="name"><br/>

  <!-- 简写 -->
  单向数据绑定：<input type="text" :value="name"><br/>
  双向数据绑定：<input type="text" v-model="name"><br/>
```

## 数据代理

vue2.x 使用 Object.defineproperty 代理实现

## 事件修饰符

### Vue中的事件修饰符

1.prevent：阻止默认事件（常用）；
2.stop：阻止事件冒泡（常用）；
3.once：事件只触发一次（常用）；
4.capture：使用事件的捕获模式；
5.self：只有event.target是当前操作的元素时才触发事件；
6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

### 按键别名

1. Vue中常用的按键别名：

* 回车 => enter
* 删除 => delete (捕获“删除”和“退格”键)
* 退出 => esc
* 空格 => space
* 换行 => tab (特殊，必须配合keydown去使用)
* 上 => up
* 下 => down
* 左 => left
* 右 => right

1. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）

1. 系统修饰键（用法特殊）：ctrl、alt、shift、meta

  (1).配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
  (2).配合keydown使用：正常触发事件。

1. 也可以使用keyCode去指定具体的按键（不推荐）

1. Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

## 计算属性

只读取可采用简写方式，即读取又可写入采用全写方式

```javascript
computed:{
  // 全写方式: 可读可写
  fullName:{
    // get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
    // get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
    get(){
      console.log('get被调用了')
      return this.firstName + '-' + this.lastName
    },
    // set什么时候调用? 当fullName被修改时。
    set(value){
      console.log('set',value)
      const arr = value.split('-')
      this.firstName = arr[0]
      this.lastName = arr[1]
    }
  },
  // 简写方式: 只能读
  fullName2(){
    console.log('get被调用了')
    return this.firstName + '-' + this.lastName
  }
}
```

## 监视属性

有三个属性值

* handler 监听函数
* immediate 设为 true 表示初始化时让handler调用一下
* deep 设为true指深度监听，对于对象，可以监听对象中每层的改变

如果不用设置 immediate 和 deep，可以改为简写方式

```javascript
watch:{
  numbers: {
    deep: true, // 加上该限制值，当numbers.a 改变时，也能监听到，如果不加，只能监听 numbers 的改变
    handler(newValue, oldValue) {
      console.log('numbers改变了', newValue, oldValue);
    }
  },
  // 简写方式
  numbers1(newValue, oldValue) {
    console.log('numbers1改变了', newValue, oldValue)
  }
}
```

computed和watch之间的区别

1.computed能完成的功能，watch都可以完成。
2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。

## 绑定样式

1. class样式
  写法:class="xxx" xxx可以是字符串、对象、数组。
      字符串写法适用于：类名不确定，要动态获取。
      对象写法适用于：要绑定多个样式，个数不确定，名字也不确定。
      数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
2. style样式
    :style="{fontSize: xxx}"其中xxx是动态值。
    :style="[a,b]"其中a、b是样式对象。

## 列表渲染

### for循环key的内部原理

1. 虚拟DOM中key的作用：
   * key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,
   * 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：
2. 对比规则：
    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
      ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
      ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
      创建新的真实DOM，随后渲染到到页面。
3. 用index作为key可能会引发的问题：
    1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
        会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。
    2. 如果结构中还包含输入类的DOM：
        会产生错误DOM更新 ==> 界面有问题。
4. 开发中如何选择key?:
    1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
    2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

## Vue 数据监测

Vue监视数据的原理

1. vue会监视data中所有层次的数据

2. 如何监测对象中的数据？
   通过setter实现监视，且要在new Vue时就传入要监测的数据。
    (1).对象中后追加的属性，Vue默认不做响应式处理
    (2).如需给后添加的属性做响应式，请使用如下API：
        Vue.set(target，propertyName/index，value) 或
        vm.$set(target，propertyName/index，value)

3. 如何监测数组中的数据？
   通过包裹数组更新元素的方法实现，本质就是做了两件事：
    (1).调用原生对应的方法对数组进行更新。
    (2).重新解析模板，进而更新页面。

4. 在Vue修改数组中的某个元素一定要用如下方法：
      1. 使用这些API: push()、pop()、shift()、unshift()、splice()、sort()、reverse()，vue 会监测处理的
      2. Vue.set() 或 vm.$set()

5. 特别注意：Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象添加属性！！！

## Vue 内置的指令

* v-bind : 单向绑定解析表达式, 可简写为 :xxx
* v-model : 双向数据绑定
* v-for   : 遍历数组/对象/字符串
* v-on    : 绑定事件监听, 可简写为@
* v-if    : 条件渲染（动态控制节点是否存存在）
* v-else  : 条件渲染（动态控制节点是否存存在）
* v-show  : 条件渲染 (动态控制节点是否展示)
* v-text指令:
  1. 作用：向其所在的节点中渲染文本内容。
  1. 与插值语法的区别：v-text会替换掉节点中的内容，{{xx}}则不会
* v-html指令：
  1. 作用：向指定节点中渲染包含html结构的内容。
  2. 与插值语法的区别：
        (1).v-html会替换掉节点中所有的内容，{{xx}}则不会。
        (2).v-html可以识别html结构。
  3. 严重注意：v-html有安全性问题！！！！
        (1).在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
        (2).一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！
* v-cloak指令（没有值）：
  1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性。
  2. 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题。
* v-once指令：
  1.v-once所在节点在初次动态渲染后，就视为静态内容了。
  2.以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能。
* v-pre指令：
  1.跳过其所在节点的编译过程。
  2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

## Vue 自定义指令

自定义指令总结：

1. 定义语法
   * 局部指令

    ```javascript
        new Vue({
          directives:{指令名:配置对象}
        });

        // 或
        new Vue({
            directives{指令名:回调函数}
        })
    ```

   * 全局指令

      ```javascript
        Vue.directive(指令名,配置对象)
        //或
        Vue.directive(指令名,回调函数)
     ```

2. 配置对象中常用的3个回调：
    (1).bind：指令与元素成功绑定时调用。
    (2).inserted：指令所在元素被插入页面时调用。
    (3).update：指令所在模板结构被重新解析时调用。

3. 备注：
    1.指令定义时不加v-，但使用时要加v-；
    2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。

## Vue 生命周期

生命周期

1. 又名：生命周期回调函数、生命周期函数、生命周期钩子。
2. 是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
4. 生命周期函数中的this指向是vm 或 组件实例对象。

常用的生命周期钩子

1. mounted: 发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
2. beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁Vue实例

1. 销毁后借助Vue开发者工具看不到任何信息。
2. 销毁后自定义事件会失效，但原生DOM事件依然有效。
3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了。

![生命周期](./assets/生命周期.png)
