# JS - 简介 

## 为什么学习 JavaScript?
JavaScript web 开发人员必须学习的 3 门语言中的一门：
HTML 定义了网页的内容
CSS 描述了网页的布局
JavaScript 网页的行为
本教程是关于 JavaScript 及介绍 JavaScript 如何与 HTML 和 CSS 一起工作。

JavaScript 是互联网上最流行的脚本语言，这门语言可用于 HTML 和 web，更可广泛用于服务器、PC、笔记本电脑、平板电脑和智能手机等设备。

## JavaScript 是脚本语言
JavaScript 是一种轻量级的编程语言。
JavaScript 是可插入 HTML 页面的编程代码。
JavaScript 插入 HTML 页面后，可由所有的现代浏览器执行。
JavaScript 很容易学习。


## JavaScript：直接写入 HTML 输出流
``` js
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落。</p>");
```

## JavaScript：对事件的反应
``` js
<button type="button" onclick="alert('欢迎!')">点我!</button>
```
alert() 函数在 JavaScript 中并不常用，但它对于代码测试非常方便。
onclick 事件只是您即将在本教程中学到的众多事件之一。

JavaScript：改变 HTML 内容
使用 JavaScript 来处理 HTML 内容是非常强大的功能。
``` js
x=document.getElementById("demo")  //查找元素
x.innerHTML="Hello JavaScript";    //改变内容
```
您会经常看到 document.getElementById("some id")。这个方法是 HTML DOM 中定义的。
DOM (Document Object Model)（文档对象模型）是用于访问 HTML 元素的正式 W3C 标准。
您将在本教程的多个章节中学到有关 HTML DOM 的知识。

## JavaScript：改变 HTML 图像
本例会动态地改变 HTML \<image\> 的来源（src）：
``` js
<script>
function changeImage()
{
    element=document.getElementById('myimage')
    if (element.src.match("bulbon"))
    {
        element.src="/images/pic_bulboff.gif";
    }
    else
    {
        element.src="/images/pic_bulbon.gif";
    }
}
</script>
<img id="myimage" onclick="changeImage()" src="/images/pic_bulboff.gif" width="100" height="180">
```

## JavaScript 用法
HTML 中的脚本必须位于 \<script\> 与 \</script\> 标签之间。
脚本可被放置在 HTML 页面的 \<body\> 和 \<head\> 部分中。

## script 标签
如需在 HTML 页面中插入 JavaScript，请使用 \<script\> 标签。
\<script\> 和 \</script\> 会告诉 JavaScript 在何处开始和结束。
\<script\> 和 \</script\> 之间的代码行包含了 JavaScript:
``` js
<script>
alert("我的第一个 JavaScript");
</script>
```
您无需理解上面的代码。只需明白，浏览器会解释并执行位于 \<script\> 和 \</script\>之间的 JavaScript 代码 

## body 中的 JavaScript
在本例中，JavaScript 会在页面加载时向 HTML 的 \<body\> 写文本：
``` js
<!DOCTYPE html>
<html>
<body>
.
.
<script>
document.write("<h1>这是一个标题</h1>");
document.write("<p>这是一个段落</p>");
</script>
.
.
</body>
</html>
```

## JavaScript 函数和事件
上面例子中的 JavaScript 语句，会在页面加载时执行。
通常，我们需要在某个事件发生时执行代码，比如当用户点击按钮时。
如果我们把 JavaScript 代码放入函数中，就可以在事件发生时调用该函数。
您将在稍后的章节学到更多有关 JavaScript 函数和事件的知识。

## 在 head 或者 bod> 的JavaScript
您可以在 HTML 文档中放入不限数量的脚本。
脚本可位于 HTML 的 \<body\> 或 \<head\> 部分中，或者同时存在于两个部分中。
通常的做法是把函数放入 \<head\> 部分中，或者放在页面底部。这样就可以把它们安置到同一处位置，不会干扰页面的内容。
## head 中的 JavaScript 函数
在本例中，我们把一个 JavaScript 函数放置到 HTML 页面的 \<head\> 部分。
该函数会在点击按钮时被调用：
``` js
<!DOCTYPE html>
<html>
<head>
<script>
function myFunction()
{
    document.getElementById("demo").innerHTML="我的第一个 JavaScript 函数";
}
</script>
</head>
<body>
<h1>我的 Web 页面</h1>
<p id="demo">一个段落</p>
<button type="button" onclick="myFunction()">尝试一下</button>
</body>
</html>

```


## body 中的 JavaScript 函数
在本例中，我们把一个 JavaScript 函数放置到 HTML 页面的 \<body\> 部分。
该函数会在点击按钮时被调用：
``` js
<!DOCTYPE html>
<html>
<body>
<h1>我的 Web 页面</h1>
<p id="demo">一个段落</p>
<button type="button" onclick="myFunction()">尝试一下</button>
<script>
function myFunction()
{
    document.getElementById("demo").innerHTML="我的第一个 JavaScript 函数";
}
</script>
</body>
</html>
```
## 外部的 JavaScript
也可以把脚本保存到外部文件中。外部文件通常包含被多个网页使用的代码。
外部 JavaScript 文件的文件扩展名是 .js。
如需使用外部文件，请在 \<script\> 标签的 "src" 属性中设置该 .js 文件：
``` js
<!DOCTYPE html>
<html>
<body>
<script src="myScript.js"></script>
</body>
</html>

```

你可以将脚本放置于 \<head\> 或者 \<body\>中，放在 \<script\> 标签中的脚本与外部引用的脚本运行效果完全一致。
myScript.js 文件代码如下：
```js
function myFunction()
{
    document.getElementById("demo").innerHTML="我的第一个 JavaScript 函数";
}
```



## ...待续...

