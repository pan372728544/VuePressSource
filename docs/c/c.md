# C语言 - 指针一

## C 指针
学习 C 语言的指针既简单又有趣。通过指针，可以简化一些 C 编程任务的执行，还有一些任务，如动态内存分配，没有指针是无法执行的。所以，想要成为一名优秀的 C 程序员，学习指针是很有必要的。
正如您所知道的，每一个变量都有一个内存位置，每一个内存位置都定义了可使用连字号（&）运算符访问的地址，它表示了在内存中的一个地址。请看下面的实例，它将输出定义的变量地址：

``` swift
#include <stdio.h>
 
int main ()
{
   int  var1;
   char var2[10];
 
   printf("var1 变量的地址： %p\n", &var1  );
   printf("var2 变量的地址： %p\n", &var2  );
 
   return 0;
}
```
当上面的代码被编译和执行时，它会产生下列结果：
```
var1 变量的地址： 0x7fff5cc109d4
var2 变量的地址： 0x7fff5cc109de
```
通过上面的实例，我们了解了什么是内存地址以及如何访问它。接下来让我们看看什么是指针。

## 什么是指针？
指针是一个变量，其值为另一个变量的地址，即，内存位置的直接地址。就像其他变量或常量一样，您必须在使用指针存储其他变量地址之前，对其进行声明。指针变量声明的一般形式为：
``` swift
type *var-name;
```

在这里，type 是指针的基类型，它必须是一个有效的 C 数据类型，var-name 是指针变量的名称。用来声明指针的星号 * 与乘法中使用的星号是相同的。但是，在这个语句中，星号是用来指定一个变量是指针。以下是有效的指针声明：
``` swift
int    *ip;    /* 一个整型的指针 */
double *dp;    /* 一个 double 型的指针 */
float  *fp;    /* 一个浮点型的指针 */
char   *ch;     /* 一个字符型的指针 */
```

所有指针的值的实际数据类型，不管是整型、浮点型、字符型，还是其他的数据类型，都是一样的，都是一个代表内存地址的长的十六进制数。不同数据类型的指针之间唯一的不同是，指针所指向的变量或常量的数据类型不同。
## 如何使用指针？
使用指针时会频繁进行以下几个操作：定义一个指针变量、把变量地址赋值给指针、访问指针变量中可用地址的值。这些是通过使用一元运算符 * 来返回位于操作数所指定地址的变量的值。下面的实例涉及到了这些操作：
``` swift
#include <stdio.h>
 
int main ()
{
   int  var = 20;   /* 实际变量的声明 */
   int  *ip;        /* 指针变量的声明 */
 
   ip = &var;  /* 在指针变量中存储 var 的地址 */
 
   printf("Address of var variable: %p\n", &var  );
 
   /* 在指针变量中存储的地址 */
   printf("Address stored in ip variable: %p\n", ip );
 
   /* 使用指针访问值 */
   printf("Value of *ip variable: %d\n", *ip );
 
   return 0;
}
```
当上面的代码被编译和执行时，它会产生下列结果：
```
Address of var variable: bffd8b3c
Address stored in ip variable: bffd8b3c
Value of *ip variable: 20
```
## C 中的 NULL 指针
在变量声明的时候，如果没有确切的地址可以赋值，为指针变量赋一个 NULL 值是一个良好的编程习惯。赋为 NULL 值的指针被称为空指针。
NULL 指针是一个定义在标准库中的值为零的常量。请看下面的程序：
``` swift
#include <stdio.h>
 
int main ()
{
   int  *ptr = NULL;
 
   printf("ptr 的地址是 %p\n", ptr  );
 
   return 0;
}
```
当上面的代码被编译和执行时，它会产生下列结果：
```
ptr 的地址是 0x0
```
在大多数的操作系统上，程序不允许访问地址为 0 的内存，因为该内存是操作系统保留的。然而，内存地址 0 有特别重要的意义，它表明该指针不指向一个可访问的内存位置。但按照惯例，如果指针包含空值（零值），则假定它不指向任何东西。
如需检查一个空指针，您可以使用 if 语句，如下所示：
``` swift
if(ptr)     /* 如果 p 非空，则完成 */
if(!ptr)    /* 如果 p 为空，则完成 */
```


## C 指针的算术运算
C 指针是一个用数值表示的地址。因此，您可以对指针执行算术运算。可以对指针进行四种算术运算：++、--、+、-。
假设 ptr 是一个指向地址 1000 的整型指针，是一个 32 位的整数，让我们对该指针执行下列的算术运算：
```
ptr++
```
在执行完上述的运算之后，ptr 将指向位置 1004，因为 ptr 每增加一次，它都将指向下一个整数位置，即当前位置往后移 4 个字节。这个运算会在不影响内存位置中实际值的情况下，移动指针到下一个内存位置。如果 ptr 指向一个地址为 1000 的字符，上面的运算会导致指针指向位置 1001，因为下一个字符位置是在 1001。

## 递增一个指针
我们喜欢在程序中使用指针代替数组，因为变量指针可以递增，而数组不能递增，因为数组是一个常量指针。下面的程序递增变量指针，以便顺序访问数组中的每一个元素：
``` swift
#include <stdio.h>

const int MAX = 3;

int main ()
{
   int  var[] = {10, 100, 200};
   int  i, *ptr;

   /* 指针中的数组地址 */
   ptr = var;
   for ( i = 0; i < MAX; i++)
   {

      printf("存储地址：var[%d] = %x\n", i, ptr );
      printf("存储值：var[%d] = %d\n", i, *ptr );

      /* 移动到下一个位置 */
      ptr++;
   }
   return 0;
}
```
当上面的代码被编译和执行时，它会产生下列结果：
```
存储地址：var[0] = bf882b30
存储值：var[0] = 10
存储地址：of var[1] = bf882b34
存储值： var[1] = 100
存储地址：of var[2] = bf882b38
存储值：var[2] = 200
```
## 递减一个指针
同样地，对指针进行递减运算，即把值减去其数据类型的字节数，如下所示：
``` swift
#include <stdio.h>

const int MAX = 3;

int main ()
{
   int  var[] = {10, 100, 200};
   int  i, *ptr;

   /* 指针中最后一个元素的地址 */
   ptr = &var[MAX-1];
   for ( i = MAX; i > 0; i--)
   {

      printf("存储地址：var[%d] = %x\n", i-1, ptr );
      printf("存储值：var[%d] = %d\n", i-1, *ptr );

      /* 移动到下一个位置 */
      ptr--;
   }
   return 0;
}
```
当上面的代码被编译和执行时，它会产生下列结果：
```
存储地址：var[2] = 518a0ae4
存储值：var[2] = 200
存储地址：var[1] = 518a0ae0
存储值：var[1] = 100
存储地址：var[0] = 518a0adc
存储值：var[0] = 10
```
## 指针的比较
指针可以用关系运算符进行比较，如 ==、\< 和 \>。如果 p1 和 p2 指向两个相关的变量，比如同一个数组中的不同元素，则可对 p1 和 p2 进行大小比较。
下面的程序修改了上面的实例，只要变量指针所指向的地址小于或等于数组的最后一个元素的地址 &var[MAX - 1]，则把变量指针进行递增：
``` swift
#include <stdio.h>

const int MAX = 3;

int main ()
{
   int  var[] = {10, 100, 200};
   int  i, *ptr;

   /* 指针中第一个元素的地址 */
   ptr = var;
   i = 0;
   while ( ptr <= &var[MAX - 1] )
   {

      printf("Address of var[%d] = %x\n", i, ptr );
      printf("Value of var[%d] = %d\n", i, *ptr );

      /* 指向上一个位置 */
      ptr++;
      i++;
   }
   return 0;
}
```
当上面的代码被编译和执行时，它会产生下列结果：
```
Address of var[0] = bfdbcb20
Value of var[0] = 10
Address of var[1] = bfdbcb24
Value of var[1] = 100
Address of var[2] = bfdbcb28
Value of var[2] = 200
```

