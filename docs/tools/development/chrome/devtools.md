# Chrome 开发者工具

## 开发调试技巧

* 我们知道在当前的文件中可以搜索一个特殊的字符串，同时也支持文本替换，选中 “Relpace” 将会出现第二个输入区域来填写用于替换的文本。
  替换后保存，就可以接着运行调试代码了，也可以对修改的 js 或 css 文件另存为本地
* 利用Snippets自定义 JavaScript 片段，这样可以创建测试代码、小工具或其他任何代码，一般用 Snippets 来创建书签、实用工具、Debugging 或 Monkey-patching。Snippets 位于 sources面板中，选中一个创建的文件，右击点 run 运行，也可以利用快捷键（Ctr / Cmd + Enter），也可以运行部分代码，选中后点击右键，选择 “Evaluate in Console”，快捷键为 Ctrl + Shift + E
* 启用尺子，在 Setting > Preferences > Show rulers 下可以启用一个尺子，当你鼠标悬停在某个元素上或者选中一个元素的时候，它会显示出来。
* 在开发者工具中的颜色选择器：在 style 面板中，点击样式中颜色值前面的小图标，可弹出颜色选择框
* 在元素面板中拖曳，可以重新定位元素位置
* 强制元素状态，如果我们想要查看一个元素的 :active，:hover，:focus，:visited，对应的样式，我们可以选中某一元素，右击，选择对应的元素状态行为即可。也可以在 Style 面板中点击 :hov 来调出状态选项
* 通过开发者工具编写并调试 Sass（这个功能不错，待研究一下）
* 清除网络缓存和 cookies，在 network 面板中右击（Ctrl+左击）选择 clear browser cache 或 clear browser cookie
* 可以为 DOM 元素设置断点，当你不确定 JavaScript 脚本的哪一部分会更新给定元素的时候，你可以使用 DOM 断点来调试复杂的 JavaScript 应用。DOM 断点可以设置 子树的修改，属性修改，节点移除，右击某个 DOM 树，选择 Break On
* 查看元素事件监听器，参见这里 <http://wiki.jikexueyuan.com/project/chrome-devtools/editing-styles-and-the-dom.html>
* 模拟网络连接，在 network 面板中可以选择连接速度来模拟在弱网甚至没网的情况下，页面加载情况

## 控制台命令

我们可以读这篇文章来学习控制台相关命令  <http://wiki.jikexueyuan.com/project/chrome-devtools/using-the-console.html>

Console 控制台命令，主要有：

```javascript
console.info()
console.debug()
console.log()
console.error()
console.warn()
console.assert()
console.group()
console.groupEnd()
```

### assert 断言

```console.assert()``` 方法仅仅只当它的第一个参数为 false 时才显示一个错误信息字符串（它的第二个参数）

一个简单的断言并且如何展示的例子。

在下面的代码中，如果在列表中的子节点的数量超过 500，将会在控制台中引起错误信息。

```javascript
console.assert(list.childNodes.length < 500, "Node count is > 500");
```

### 输出分组

你可以通过分组命令把相关联的输出信息分在一起。group 命令通过一个字符串的参数来给你的组命名。控制台将会把所有所有的输出信息组合到一块。要结束分组，你只需要调用 groupEnd 即可。

一个分组的例子

```javascript
var user = "jsmith", authenticated = false;
console.group("Authentication phase");
console.log("Authenticating user '%s'", user);
// authentication code here...
if (!authenticated) {
    console.log("User '%s' not authenticated.", user)
}
console.groupEnd();
```

分组信息也可以嵌套使用

console.groupCollapsed() 的用法与 console.group() 类似，只是可以把分组后输出的结果折叠显示

### 浏览结构化数据

console.table() 提供了一个简单的方法来查看相似数据对象。这将给一个数据提供属性并且创建一个头。行数据将会从每一个索引属性值中获取。

控制台中一个使用 2 个数组的示例的显示。

```javascript
console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
console.table([[1,2,3], [2,3,4]]);
```

console.table() 中的第二个参数是可选项。你可以定义任何你想显示的属性字符串数组。

一个使用了对象集合的控制台输出表。

示例代码：

```javascript
function Person(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
}
var family = {};
family.mother = new Person("Susan", "Doyle", 32);
family.father = new Person("John", "Doyle", 33);
family.daughter = new Person("Lily", "Doyle", 5);
family.son = new Person("Mike", "Doyle", 8);
console.table(family, ["firstName", "lastName", "age"]);
```

### 字符串的替换和格式化

任何日志方法的第一个参数可能都会包含一个或者多个格式说明符。一个说明符由一个 % 符号和后面跟着的字符组成，这个字符用来定义用于格式化的值。这个参数跟随的字符串就是占位符中所要显示的。

下面的例子使用了字符串和数字格式来插入要输出的字符串。你将会看到在控制台中 Sam 有 100 个点。

```console.log("%s has %d points", "Sam", 100);```

完整的格式化说明符如下：

| 格式符     | 说明                                                      |
|-----------|----------------------------------------------------------|
| %s         | 格式化成 string                                           |
| %i 或者 %d | 格式化成 integer                                          |
| %f         | 格式化成一个浮点类型                                      |
| %o         | 格式化成一个可扩展的 DOM 元素。就跟在元素面板中看到的一样 |
| %o         | 格式化成一个可扩展的 JavaScript                           |
| %c         | 通过第二个参数来申请一个 CSS 风格的输出字符串             |

### 将 DOM 元素格式化成 JavaScript 对象

当你想要在控制台中记录一个 DOM 元素，就显示成了 XML 格式。在元素面板中也会是同样的显示。要显示 JavaScript 格式的信息，你可以使用 dir() 方法或者是在 log() 中使用占位符来替换成你的 JavaScript。

看小面的例子

```javascript
console.log(document.body.firstElementChild)
dir(document.body.firstElementChild)
```

运行一下就可以看出他们的不同之处

### 计算时间开销

通过 time() 方法可以启动一个计时器。你必须输入一个字符串来识别时间的标记。当你要结束计算的时候，使用 timeEnd() 方法，并且传递一个相同的字符串给构造器。控制台会在 timeEnd() 方法结束的时候，记录下标签以及时间的花销。

示例代码：

```javascript
console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
console.timeEnd("Array initialize");
```

## 快捷键

[Chrome 开发者工具(DevTools)中所有快捷方式列表](http://9iphp.com/web/javascript/chrome-devtools-shortcuts.html)

* Ctrl + o (windows,Linux)   Cmd + o (Mac OS X)
  当焦点定位到 Chrome developer tools 中，按下该快捷键，会自动切换到 sources，并弹出过滤窗口，通过模糊输入文件名，找到要查看的 js、 css、html、png 等文件，注意模糊匹配支持驼峰查找，比如：打开FooBarScript.js，你可以只写 FBaSc，这样可以节省时间。
* Ctrl + Shift + F (Windows,Linux)   Cmd + Opt + F (Mac OS X) 在所有文件中搜索，支持正则表达式搜索
* Ctrl + Shitf + O (Windows,Linux)   Cmd + Shitf + O (Mac OS X) 进入源面板(sources)，然后就可以使用该快捷键来打开一个对应函数/特定选择器的选择框，在该选择框可以查找函数或方法/css选择器，这样就可以迅速定位到要查询的位置，方便快捷
* ```Ctrl + P + :<number> (Windows)   Cmd + P + :<number>``` 快速跳转到某一行

## 扩展工具

* 利用开发者工具测试 iOS 应用 PonyDebugger 是一个客户端的库同时也是一个使用 Chrome 开发工具来调试应用网络状况以及管理对象上下文的网关服务器。
* JSRunTime：开发者工具检索 JavaScript 对象的拓展
