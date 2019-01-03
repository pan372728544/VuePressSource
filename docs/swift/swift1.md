# Object-C - Swift基础


## 声明常量和变量

常量和变量必须在使用之前声明。使用 let 关键字声明常量，使用 var 关键字声明变量。下面是一个示例，说明如何使用常量和变量来跟踪用户进行的登录尝试次数：
``` swift
let maximumNumberOfLoginAttempts = 10
var currentLoginAttempt = 0
```

## 类型注解

当你声明一个常量或者变量的时候，你可以提供一个 类型注解 来明确存储的值的类型。
通过在常量或变量名称的后面放置一个冒号，并再跟一个空格，最后是要使用的类型名称。
下面的例子为 welcomeMessage 的变量提供了一个类型注解，以表明该变量可以存储 String 值。

``` swift
var welcomeMessage: String
```

## 命名常量和变量
你可以把现有变量的值改为兼容类型的另一个值，在这个示例里， friendlyWelcome 的值由 "Hello" 变为 "Bonjour!" ：
``` swift
var friendlyWelcome = "Hello!"
friendlyWelcome = "Bonjour!"
// friendlyWelcome 现在是 "Bonjour!"
```
和变量不同，常量的值被设定后不可更改，尝试修改则会在编译时报错：

``` swift
let languageName = "Swift"
languageName = "Swift++"
// 编译错误: languageName 不可修改.
```

## 打印常量与变量

你可以通过print(_:separator:terminator:)方法来打印一个常量或变量当前的值。
``` swift
print("The current value of friendlyWelcome is \(friendlyWelcome)")
// Prints "The current value of friendlyWelcome is Bonjour!"
```

## 布尔值

Swift 有一个基础 布尔 类型 Bool. 布尔值也被称为 逻辑值, 因为它们只能是真或假。 Swift 提供两个布尔常量， true 和 false ：
``` swift
let orangesAreOrange = true
let turnipsAreDelicious = false
```

## 元组

元组 将多个值组合在一起成为一个复合值。元组里面的值可以是任何类型，不需要是相同的类型。

下面的例子中，(404, "Not Found") 是一个描述了 HTTP 状态码 的元组。一个 HTTP 状态码是
当你请求一个网页时服务器返回的一个特殊值。如果你请求的网页不存在的话，就会返回状态码 404 Not Found 。
``` swift
let http404Error = (404, "Not Found")
// http404Error 的类型是 (Int, String), 等于 (404, "Not Found")
```

## 可选类型

使用 可选类型 来处理值可能缺省的情况。一个可选类型代表了两种可能：要么 有 值，然后你就可以通过解包来获取值；要么 没有 值。  
如果你定义了一个可选变量但没有赋值，变量将自动设置为 nil ：
``` swift
var surveyAnswer: String?
// surveyAnswer 被自动设置为 nil
```

## 闭合区间运算符

闭合区间运算符 (a...b) 表示从 a 到 b 的区间，并且包含 a 和 b。a 一定不能大于 b。

当你想遍历一个区间中的值加以利用时，那么闭合区间运算符就在合适不过了，比如在用 for-in 循环的时候：

``` swift
for index in 1...5 {
    print("\(index) times 5 is \(index * 5)")
}
// 1 times 5 is 5
// 2 times 5 is 10
// 3 times 5 is 15
// 4 times 5 is 20
// 5 times 5 is 25
```

## 半开区间运算符

半开区间运算符（a..<b）定义了一个从 a 到 b 但不包括 b 的区间。之所以称之为半开，是因为该区间只包含第一个值，而不包含最后一个值。与闭区间运算符一样，a 绝不可以大于 b。如果 a 等于 b 的话，就表示该区间为空。

当你作用于一个索引从 0 开始的列表（比如数组）时，如果你想要从 0 开始，一直数到（但不过包括）列表的长度，半开区间就显得非常有用了:

``` swift
let names = ["Anna", "Alex", "Brian", "Jack"]
let count = names.count
for i in 0..<count {
    print("Person \(i + 1) is called \(names[i])")
}
// Person 1 is called Anna
// Person 2 is called Alex
// Person 3 is called Brian
// Person 4 is called Jack

```

## 初始化一个空字符串

创建一个空 String 有两种方式，给一个变量赋值一个空字符串或者使用下面的语法初始化一个 String 实例对象：
``` swift
var emptyString = ""               // 空字符串
var anotherEmptyString = String()  // 初始化语法
//这是两个空字符串，他们等价
```
可以通过检查 String 的布尔类型的属性 isEmpty 来判断该字符串的值是否为空：
``` swift
if emptyString.isEmpty {
    print("Nothing to see here")
}
// 打印 "Nothing to see here"
```


## 插入和删除

在一个字符串指定位置插入单个字符，使用 insert(:at:) 方法，而要插入另一个字符串的内容时，使用 insert(contentsOf:at:) 方法。
``` swift

var welcome = "hello"
welcome.insert("!", at: welcome.endIndex)
// welcome 现在等于 "hello!"

welcome.insert(contentsOf: " there", at: welcome.index(before: welcome.endIndex))
// welcome 现在等于 "hello there!"
```
删除一个字符串指定位置的单个字符，用 remove(at:) 方法，而要删除指定范围的子字符串时，用 removeSubrange：
``` swift
welcome.remove(at: welcome.index(before: welcome.endIndex))
// welcome 现在等于 "hello there"

let range = welcome.index(welcome.endIndex, offsetBy: -6)..<welcome.endIndex
welcome.removeSubrange(range)
// welcome 现在等于 "hello"
```


## 创建一个空数组

我们可以使用构造语法来创建一个由特定数据类型构成的空数组：
``` swift
var someInts = [Int]()
print("someInts is of type [Int] with \(someInts.count) items.")
// 打印 "someInts is of type [Int] with 0 items."
```


## 创建一个空字典

我们可以像数组一样使用构造语法创建一个拥有确定类型的空字典：
``` swift
var namesOfIntegers = [Int: String]()
// namesOfIntegers 是一个空的 [Int: String] 字典
```

## For-In 循环

可以使用 for-in 循环来遍历序列中的所有元素，例如数组中的所有元素，数字的范围，或者字符串的字符。

下面是使用 for-in 循环遍历数组的例子：
``` swift
let names = ["Anna", "Alex", "Brian", "Jack"]
for name in names {
    print("Hello, \(name)!")
}
// Hello, Anna!
// Hello, Alex!
// Hello, Brian!
// Hello, Jack!
```

## 函数的定义和调用

在定义一个函数时，你可以可选地提供一个或多个输入值作为参数。当函数执行完成时，你也能可选地提供一个值作为返回值。

每一个函数的 函数名 描述了这个这个函数需要做的事情。你可以通过这个函数名去调用它并为它提供符合参数类型的参数值。 函数的实参值必须按形参的参数列表顺序依次传入。

下面我们定义一个 greet(person:) 方法 , 它表示向一个人打招呼， 它接受一个 String 类型的值做为输入并返回一个 String 类型的值 。
``` swift
func greet(person: String) -> String {
    let greeting = "Hello, " + person + "!"
    return greeting
}
```


## 闭包表达式

嵌套函数 是一个在大功能中进行命名和定义自包含代码块的便捷方式。但是，有的时候它在写一些没有完整声明和命名的类似函数结构的更短版本时很有用。当你处理一些将函数作为它的一个或多个参数的函数时这种方式尤其有用。

闭包表达式 是一种用简短、集中的语法构建内联闭包的方式。闭包表达式提供了几种语法优化的方式，使其能够写出简短的闭包而又不失去闭包函数的可读性。下面的闭包表达式示例，通过在几次迭代中不断改善 sorted(by:) 方法的方式来说明这些优化，每一次迭代都用更简洁的方式描述了相同的功能。


## 方法排序

Swift的基础库提供了一个名字叫做 sorted(by:) API，它通过你编写的一个闭包来进行对数组进行排序。 当完成所有排序代码,  sorted(by:) 方法会返回一个与旧数组相同规格和相同类型的新数组, 并且每个元素都会在正确的位置。 最开始的数组也不会通过 sorted(by:) 被修改。

下面的闭包示例使用了 sorted(by:) 方法进行了对于 String 类型进行反向排序。这是最开始将要被排序的数组：
``` swift
let names = ["Chris", "Alex", "Ewa", "Barry", "Daniella"]
```
sorted(by:) 方法接受一个闭包表达式，闭包表达式接受两个相同类型的数组元素，并且返回 Bool 布尔值来告诉是否第一个值应该在第二个值的前面还是后面。如果这个第一个值应该在第二个值 前面 则返回 true, 反之返回 false。

这个例子是对 String 类型的数组进行排序，因此这个闭包需要是  (String, String) -> Bool 类型的函数。

提供该排序闭包的一种方法是写正确类型的函数，并且作为参数传入 sorted(by:) 方法中。 如下：
``` swift
func backward(_ s1: String, _ s2: String) -> Bool {
    return s1 > s2
}
var reversedNames = names.sorted(by: backward)
// reversedNames 会等于 ["Ewa", "Daniella", "Chris", "Barry", "Alex"]
```
如果第一个字符串「s1」大与第二个字符串「s2」，backward(_:_: ) 函数将返回 true ，指示 s1 在这个排序数组中位置应该在 s2 的前面。对于字符串来说，“大于”的意思就是“在字母表中出现较后”。这意思是说字母 "B" 是大于字母 "A" 的，也就是说字符串 "Tom" 是大于 "Tim" 的。这是一个反向排序的例子  "Barry" 将出现在 "Alex" 前面，依此类推。

然而，使用单一表达式的函数「a>b」是一种相当冗长的方式。在本例中最好写法是使用闭包表达式内联的方式编写一个排序闭包。

## 闭包表达式语法

闭包表达式语法基本组成如下:
``` swift
{ (parameters) -> return type in
    statements
}
```
parameters 在闭包表达式中当作入参，但它们没有默认值。如果你参数类型为入参，则可以在闭包中使用可变类型的方法。元组也可以当做参数和返回值。

下面的例子展示了上面  backward(_ :_: ) 函数的闭包表达式版本：
``` swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in
    return s1 > s2
})
```
注意这个内联闭包与  backward(_:_: ) 函数的入参和返回值是相同的。在这两种情况下，它被写成  (s1: String, s2: String) -> Bool 。然而，对于内联闭包表达式，参数和返回值被写在花括号‘内部’，而不是外部。

闭包表达式主体部分开始于关键字 in 。这个关键字也代表这个闭包的入参和返回值已经声明结束，主体部分将要开始。

因为上面闭包表达式的主体部分比较短，甚至可以写成一行。
``` swift
reversedNames = names.sorted(by: { (s1: String, s2: String) -> Bool in return s1 > s2 } )
```
这也说明了 sorted(by:) 方法总体调用保持不变。一对括号仍然包含该方法的入参。然而，现在参数却是一个内联闭包了。