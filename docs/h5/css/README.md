#  CSS - 简介
## 什么是 CSS?

- CSS 指层叠样式表 (Cascading Style Sheets)
- 样式定义如何显示 HTML 元素
- 样式通常存储在样式表中
- 把样式添加到 HTML 4.0 中，是为了解决内容与表现分离的问题
- 外部样式表可以极大提高工作效率
- 外部样式表通常存储在 CSS 文件中
- 多个样式定义可层叠为一
 
##  CSS 实例
CSS声明总是以分号(;)结束，声明组以大括号({})括起来:
``` css
p
{
color:red;
text-align:center;
}
```
## CSS 注释
注释是用来解释你的代码，并且可以随意编辑它，浏览器会忽略它。
CSS注释以 "/*" 开始, 以 "*/" 结束, 实例如下:

``` css
/*这是个注释*/
p
{
text-align:center;
/*这是另一个注释*/
color:black;
font-family:arial;
}
```

## id 选择器
id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式。
HTML元素以id属性来设置id选择器,CSS 中 id 选择器以 "#" 来定义。
以下的样式规则应用于元素属性 id="para1":
``` css
#para1
{
    text-align:center;
    color:red;
}
```

## class 选择器
class 选择器用于描述一组元素的样式，class 选择器有别于id选择器，class可以在多个元素中使用。
class 选择器在HTML中以class属性表示, 在 CSS 中，类选择器以一个点"."号显示：
在以下的例子中，所有拥有 center 类的 HTML 元素均为居中。
``` css
.center {text-align:center;}
```

你也可以指定特定的HTML元素使用class。
在以下实例中, 所有的 p 元素使用 class="center" 让该元素的文本居中:
``` css
p.center {text-align:center;}
```

## 如何插入样式表
插入样式表的方法有三种:

- 外部样式表(External style sheet)
- 内部样式表(Internal style sheet)
- 内联样式(Inline style)

## 外部样式表
当样式需要应用于很多页面时，外部样式表将是理想的选择。在使用外部样式表的情况下，你可以通过改变一个文件来改变整个站点的外观。每个页面使用 <link> 标签链接到样式表。 <link> 标签在（文档的）头部：
``` html
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>

```

浏览器会从文件 mystyle.css 中读到样式声明，并根据它来格式文档。
外部样式表可以在任何文本编辑器中进行编辑。文件不能包含任何的 html 标签。样式表应该以 .css 扩展名进行保存。下面是一个样式表文件的例子：
``` css
hr {color:sienna;}
p {margin-left:20px;}
body {background-image:url("/images/back40.gif");}
```

## 内部样式表
当单个文档需要特殊的样式时，就应该使用内部样式表。你可以使用 \<style\> 标签在文档头部定义内部样式表，就像这样:
``` html
<head>
<style>
hr {color:sienna;}
p {margin-left:20px;}
body {background-image:url("images/back40.gif");}
</style>
</head>
```

## 内联样式
由于要将表现和内容混杂在一起，内联样式会损失掉样式表的许多优势。请慎用这种方法，例如当样式仅需要在一个元素上应用一次时。
要使用内联样式，你需要在相关的标签内使用样式（style）属性。Style 属性可以包含任何 CSS 属性。本例展示如何改变段落的颜色和左外边距：

``` html
<p style="color:sienna;margin-left:20px">这是一个段落。</p>
```

## 多重样式
如果某些属性在不同的样式表中被同样的选择器定义，那么属性值将从更具体的样式表中被继承过来。 
例如，外部样式表拥有针对 h3 选择器的三个属性：
``` css
h3
{
    color:red;
    text-align:left;
    font-size:8pt;
}
```
而内部样式表拥有针对 h3 选择器的两个属性：
``` css
h3
{
    text-align:right;
    font-size:20pt;
}
```
假如拥有内部样式表的这个页面同时与外部样式表链接，那么 h3 得到的样式是：
``` html
color:red;
text-align:right;
font-size:20pt;
```

## CSS 背景

CSS 背景属性用于定义HTML元素的背景。
CSS 属性定义背景效果:

- background-color
- background-image
- background-repeat
- background-attachment
- background-position

``` css

<!--背景颜色-->
h1 {background-color:#6495ed;}
p {background-color:#e0ffff;}
div {background-color:#b0c4de;}

<!--背景图像 - 水平或垂直平铺-->
body
{
background-image:url('img_tree.png');
background-repeat:no-repeat;
background-position:right top;
}


```


## CSS 文本格式
``` css
<!--颜色-->
body {color:red;}
h1 {color:#00ff00;}
h2 {color:rgb(255,0,0);}

文本的对齐方式
h1 {text-align:center;}
p.date {text-align:right;}
p.main {text-align:justify;}


文本修饰
text-decoration 属性用来设置或删除文本的装饰。
从设计的角度看 text-decoration属性主要是用来删除链接的下划线：
h1 {text-decoration:overline;}
h2 {text-decoration:line-through;}
h3 {text-decoration:underline;}

文本转换
文本转换属性是用来指定在一个文本中的大写和小写字母。
可用于所有字句变成大写或小写字母，或每个单词的首字母大写。
p.uppercase {text-transform:uppercase;}
p.lowercase {text-transform:lowercase;}
p.capitalize {text-transform:capitalize;}

文本缩进
文本缩进属性是用来指定文本的第一行的缩进。
p {text-indent:50px;}

```

## 字体系列
font-family 属性设置文本的字体系列。
font-family 属性应该设置几个字体名称作为一种"后备"机制，如果浏览器不支持第一种字体，他将尝试下一种字体。
注意: 如果字体系列的名称超过一个字，它必须用引号，如Font Family："宋体"。
多个字体系列是用一个逗号分隔指明：
``` css
p{font-family:"Times New Roman", Times, serif;}
```

## 字体样式
主要是用于指定斜体文字的字体样式属性。
这个属性有三个值：

-   正常 - 正常显示文本
-  斜体 - 以斜体字显示的文字
-  倾斜的文字 - 文字向一边倾斜（和斜体非常类似，但不太支持）

``` css
p.normal {font-style:normal;}
p.italic {font-style:italic;}
p.oblique {font-style:oblique;}

```
## 字体大小
font-size 属性设置文本的大小。
能否管理文字的大小，在网页设计中是非常重要的。但是，你不能通过调整字体大小使段落看上去像标题，或者使标题看上去像段落。
请务必使用正确的HTML标签，就\<h1\> - \<h6\>表示标题和\<p\>表示段落：
字体大小的值可以是绝对或相对的大小。
绝对大小：

- 设置一个指定大小的文本
- 不允许用户在所有浏览器中改变文本大小
- 确定了输出的物理尺寸时绝对大小很有用
相对大小：

- 相对于周围的元素来设置大小
- 允许用户在浏览器中改变文字大小

::: tip
如果你不指定一个字体的大小，默认大小和普通文本段落一样，是16像素（16px=1em）。
:::

## 设置字体大小像素
设置文字的大小与像素，让您完全控制文字大小：

``` css
h1 {font-size:40px;}
h2 {font-size:30px;}
p {font-size:14px;}
```

## 用em来设置字体大小
为了避免Internet Explorer 中无法调整文本的问题，许多开发者使用 em 单位代替像素。
em的尺寸单位由W3C建议。
1em和当前字体大小相等。在浏览器中默认的文字大小是16px。
因此，1em的默认大小是16px。可以通过下面这个公式将像素转换为em：px/16=em

``` css
h1 {font-size:2.5em;} /* 40px/16=2.5em */
h2 {font-size:1.875em;} /* 30px/16=1.875em */
p {font-size:0.875em;} /* 14px/16=0.875em */
```

## 使用百分比和EM组合
在所有浏览器的解决方案中，设置 \<body\>元素的默认字体大小的是百分比：
``` css
body {font-size:100%;}
h1 {font-size:2.5em;}
h2 {font-size:1.875em;}
p {font-size:0.875em;}
```


## ...待续...