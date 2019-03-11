# 应用启用时间

## 一、 查看APP启动时间

  点击Edit Scheme，选中Arguments，在Evnironment Variables中添加 DYLD_PRINT_STATISTICS
   
   项目运行的时候就可以查看到时间了；
   
   ``` swift
   Total pre-main time: 477.92 milliseconds (100.0%)
         dylib loading time: 185.78 milliseconds (38.8%)
        rebase/binding time: 222.04 milliseconds (46.4%)
            ObjC setup time:  50.31 milliseconds (10.5%)
           initializer time:  19.65 milliseconds (4.1%)
           slowest intializers :
             libSystem.B.dylib :   2.69 milliseconds (0.5%)
    libMainThreadChecker.dylib :  10.62 milliseconds (2.2%)

   
   ```
   
## 二、查看应用加载的有哪些库

   头文件添加
   ``` swift
   #import <mach-o/dyld.h>
   ```
   
   代码：
   
   ``` swift
 uint32_t count = _dyld_image_count();

    for(uint32_t i = 0; i < count; i++)
    {
        NSString *name = [[NSString alloc]initWithUTF8String:_dyld_get_image_name(i)];
       
        NSLog(@"%@",name);
    }
   
   ```
     
   
   