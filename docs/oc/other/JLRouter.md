
# JLRouter


## 介绍 
JLRoutes是一个调用极少代码 , 可以很方便的处理不同URL schemes以及解析它们的参数，并通过回调block来处理URL对应的操作 , 可以用于处理复杂跳转逻辑的三方库.


1. 在日常开发中 , push , present 出现在整个程序的各个地方 , 如果你想快速理清一个项目的整体逻辑 , 非常麻烦 . 大多数情况 , 你得找到代码目录 ,根据层级结构分出关系 , 然后找到对应的push位置 , 寻找下一级页面 , 如果本身项目的目录就非常乱 , 那么如果要了解一个项目的整体跳转逻辑 , 非常的难. 
即便可以将 UIViewController-Swizzled 库集成到项目中 ,然后一页一页点击查询 , 但也是比较痛苦的. 
如果 , 是把整个项目的跳转逻辑都给抽取出来 , 单独放在一个类 , 模块化管理 , 那么思路就会清晰很多 , 甚至可以用XMind根据代码画出整个项目的树状图

2. 如果所处公司存在多个app , app之间互相推荐 , 互相跳转是再正常不过的需求,就类似于QQ , 微信三方分享跳转等 .如果用Appdelegate原生方法进行拦截 , 所做的事至少得是判断Scheme是否匹配 , 想办法进入需要跳到的界面 , 如果要涉及传参 , 就更加麻烦.

3. 如果用户是从PC端识别二维码,或者通过链接想要进入app指定页面

## JLRoutes原理: 
JLRoutes本质可以理解为:保存一个全局的Map，key是url，value是对应存放block的数组，url和block都会常驻在内存中，当打开一个URL时，JLRoutes就可以遍历 , 这个全局的map，通过url来执行对应的block。

## 个人理解原理 : 
1. routeControllersMap 是全局的单例字典 , 你可以想象成一个大的盒子 .  
2 . 这个盒子里装了很多的字典 , 而字典的key值对应 一个标识 , 源码中称之为 scheme ,为了不混淆 , 咱们就叫其为JLRoutes对象标识 . 这个标识对应的value值 为JLRoutes类的对象 . 
3. JLRoutes对象有很多属性 , 常用的有两个 , 一个是 scheme 也就是是上述所说的JLRoutes对象标识 , 也就是说 , 此value值记录了自己的key值 . 另外一个属性为 routes数组 , 此数组中存放了 JLRRouteDefinition 对象 . 
4. JLRRouteDefinition对象为最终的具体模型 , 也就是说 你注册的跳转逻辑的所有信息 , 都存在于这个模型中 ,包括要实施操作的block代码块 , JLRoutes对象标识 , 取url内容值的标识 

## 预热
首先了解 , 如何通过设置app URL Scheme由外部跳转到app ?

首先 , 配置info.plist —>添加URL types字段 , 你会发现其为一个数组 –>然后咱们在item 0 处在加一个URL Schemes , 又是一个数组 .这里说明了一个问题 , 一个app可以对应多个scheme —>配置scheme , URL identifier 最好设置复杂些 , 保证其唯一性

同个手机app应用之间的跳转也是如此 , 只需要调用openUrl方法 , 在另外个应用设置scheme . 例如 , A应用跳转到B应用, 那么设置B应用的scheme 为 com.mengyao_block@outlook.com:// , 在A应用中调用[[UIApplication
 sharedApplication]openURL:[NSURL URLWithString:@"com.mengyao_block@outlook.com://"]]方法 , 即可跳转到B应用 . 那么 , 假如有很多的应用都在跳转B应用 , 那么如何区分是由哪个app跳转过来 , 跳转过来又需要执行什么操作呢 ? 可以 设置多个scheme , 拦截openUrl方法 , 取出url 进行解析 , 判断 . 比如com.mengyao_block@outlook.com:// scheme代表了执行登录 , com.baidu.www:// scheme代表了执行授权 等等 . 那又将如何判断是由哪个应用跳转过来呢 ? 只需要附带上参数即可 , 例如 com.mengyao_block@outlook.com://JinSeJiaYuan 这就代表了是从金色家园app跳转过来 , 需要执行登录操作 … 
 那么 , 如果是跳到指定的页面呢 ? 首先一种方式是可以拦截openUrl方法 , 然后实现跳转 , 但是此方法跳转如果涉及传参 , 或者越了多级跳转 , 会非常的困难 . 还有一种方式, 就是利用JLRoutes
 
## 开始步骤 :

## 为程序配置URL Schemes 

平时咱们所用到的第三方分享跳转 , 也是用到了这个原理 , 通过解析参数 , 跳转到指定页面 
一个app可以对应多个URL Scheme , 如下图 info.plist配置 , 在safari中 , 只要输入 JLRoutesOne:// 或JLRoutesTwo:// 或JLRoutesThree:// 都可以打开该app , 而URL identifier 最好是保证其唯一性 , 这里咱们为app设置了3个URL Schemes ,是为了后面手动解析URL而做的准备 .
## 注册

首先 , 考虑的问题有两个 , 一是什么时候注册跳转逻辑 , 二是 在什么地方注册  
比如一个项目的tabbarItem有3个 , 那么这3个模块的跳转 , 并不是由 一个navigationController来完成 , 所以考虑到这点 , 我们可以创建一个分类 , 将跳转逻辑放在其中 , 在初始化tabbarController时 进行注册跳转逻辑
### 注册的方式有很多种 :  
### 注册全局JLRoutes
 ``` swift
	 [[JLRoutes globalRoutes]addRoute:@"取url内容值的标识" handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters) {
	 
	        return YES; //一旦匹配 , 立即返回YES
	}];
```
//此方法对应的JLRoutes对象标识为 @”JLRoutesGlobalRoutesScheme” , 由下述源码可知 , 用globalRoutes方式创建的JLRoutes对象 , 无论创建多少次 , 始终对应着同一个实例 . 也就是说 , 无论你调用上述方法多少次 , 尽管 @”取url内容值的标识” 和block块内容不一样 , 最后都会执行第一次注册的内容 . 此方法和咱们要实现的3个tabbarItem对应 3种跳转要求不合 , 因为 咱们要求的是 block块中的navigationController为 3个不同的实例对象.
## 自定义命名空间注册
``` swift
	[[JLRoutes routesForScheme:@“第一模块的标识”]addRoute:@"取url内容值的标识" handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters){
	 
	        return YES;
	    }];

//此注册方法 , 所得的JLRoutes对象都是唯一的 ,而这才是咱们真正需要的 , 如下述源码
//源码如下 , 注释不用看 , 为自己分析源码的笔记

	+ (instancetype)globalRoutes
	{
	    return [self routesForScheme:JLRoutesGlobalRoutesScheme];
	}
 
	+ (instancetype)routesForScheme:(NSString *)scheme
	{
	    //路由对象
	    JLRoutes *routesController = nil;
	 
	    static dispatch_once_t onceToken;
	    dispatch_once(&onceToken, ^{
	 
	        //全局单例字典
	        routeControllersMap = [[NSMutableDictionary alloc] init];
	    });
	 
	    //如果是不存在以scheme为key的字典 , 就创建一个 , 防止重复创建
	    if (!routeControllersMap[scheme]) {
	        routesController = [[self alloc] init];
	 
	        NSLog(@"---------------------%@",routesController);
	        //路由存储scheme (globel或自定义)
	        routesController.scheme = scheme;
	 
	        //以scheme作为key值 --对应路由对象为value
	 
	#warning  - 只要我通过global命名空间创建了JLRoutes对象 , routeControllersMap[scheme]就是有值的,一旦有值 , 我第二次创建时 , 无论以什么命名空间创建 , 都会被赋上之前第一个的值 . 从而 ,就算我多次调用global方法创建对象 ,JLRoutes对象始终保持为第一个.这也就是解释了为什么多次注册 , 始终只有第一个注册里的block被调用的原因 . 当设置了优先级 , 插入排序使得高优先级位于队列前方 , 优先被搜索出来,return掉 . 然而也只有一个注册得以实现 . 原本要实现的是 , 在创建3个navigationController时 , 分别注册四次 , 运用3个不同的navigationController进行3个模块内跳转 , 然后始终只有第一个生成的navigationController生效 , 因为后面创建的三次都被内部给覆盖掉.
	 
	        //新增以scheme为key 对应 JLRoutes对象为键值的字典
	        routeControllersMap[scheme] = routesController;
	    }
	 
	    //将value值赋值给当前路由对象   (注意:  这里的routeControllersMap 是全局单例 , 当我用global创建的对象反复addRoutes时,所创建的Routes对象都会被赋值最开始那个对象的值 , 如下)
	    routesController = routeControllersMap[scheme];
	 
	#warning  --- 在全局字典中存储一份路由的字典 , 由设置的global或者自定义scheme 为key取JLRoutes对象
	    return routesController;
	}]
	``` 
### 定义优先级 
//简单来说 , 如果不设置优先级 , 所有的注册优先级都为 0 . 当标识了优先级进行注册后 , JLRRouteDefinition 对象(最终模型)在 JLRoutes对象的routes数组中 , 将进行排序 , 类似于选择排序 , 当通过route对象 寻找到其 routes数组后 , 将会遍历整个routes数组 , 优先级高的JLRRouteDefinition对象将会被最先匹配 , 然后return YES , 停止遍历 . 咱们暂时用不上这个优先级 , 就不进行过多讲述 . 因为咱们注册的3个跳转 , 每个对应的routes数组中元素仅为1个
``` swift
       [[JLRoutes globalRoutes]addRoute:@"取url内容值的标识" priority:1 handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters) {
 
        //要实现的操作
 
        return YES;
    }];
```
### 跳转点击 
// 此处 , 三个Scheme头都不一样 , 但是正如 一种所讲 , 这三个命令我都添加进了info.plist , 所以这三种写法都可以跳转
``` swift
	    1.  第一个模块
	 - (void)touch
	{
	    NSString *url = @"JLRoutesOne://OneNextViewController";
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:nil completionHandler:nil];
	 
	}
	 
	  2. 第二个模块
	 - (void)touch
	{
	    NSString *url = @"JLRoutesTwo://TwoNextViewController";
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:@{@"name":@"JLRoutesTwo"} completionHandler:nil];
	 
	}
	 
	 3.第三个模块
	 - (void)touch
	{
	    NSString *url = @"JLRoutesThree://ThreeNextViewController";
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:@{@"name":@"JLRoutesThree"} completionHandler:nil];
	 
	}
```
## 实现openUrl方法
//手动解析URL , Scheme如果从网页跳转过来 , 拦截到的会变成小写 , 故, 直接将URL Scheme拦截下来 , 转换小写进行判断. 经过处理之后 , 交于JLRoutes进行解析 , 寻找具体的操作

//这里也解释了 , 为什么在info.plist文件中 , 要设定3个不同的URL Scheme . 当在3个不同模块中进行跳转点击时 , 这个方法是必经过 , 然后进行拦截 , 判断具体是哪个模块后交于JLRoutes解析
``` swift
	- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
	{
	 
	    NSString *str = url.absoluteString;
	    NSArray *arr = [str componentsSeparatedByString:@"://"];
	 
	    if ([[arr.firstObject lowercaseString] isEqualToString:@"jlroutesone"]) {
	 
	        return [[JLRoutes routesForScheme:@"JLRoutesOne"]routeURL:url];
	 
	    }else if ([[arr.firstObject lowercaseString] isEqualToString:@"jlroutestwo"]){
	 
	        return [[JLRoutes routesForScheme:@"JLRoutesTwo"]routeURL:url];
	    }
	 
	    return [[JLRoutes routesForScheme:@"JLRoutesThree"]routeURL:url];
	}
	 
	// JLRoute 通过遍历对应的 JLRoutes对象的routes数组 , 进行解析 , 并执行block中内容 , 具体解析 参考源码
	[JLRoutes routesForScheme:@“”]routeURL:url]
	```
## 参数传递 , 以及tabbarController 选中问题处理 
### 参数传递需要进行一一对应 .
``` swift
	    [[JLRoutes routesForScheme:@"JLRoutesOne"]addRoute:@"/:ViewController/:userID/:pass" handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters){
	 
	        Class class = NSClassFromString(parameters[@"ViewController"]);
	 
	        NSLog(@"-----------userID : %@",parameters[@"userID"]);
	        NSLog(@"-----------pass   : %@",parameters[@"pass"]);
	        [navVc pushViewController:[[class alloc]init] animated:YES];
	        NSLog(@"-------------------第一模块");
	        self.selectedIndex = 0; //解决从app外跳转进来的tabbar选中问题
	        return YES;
	    }];
	}
	```
点击方法如下
``` swift
	- (void)touch
	{
	 
	    NSString *url = @"JLRoutesOne://OneNextViewController/我是userID/我是pwd";
	 
	    //中文传输需要进行转义
	    url = [url stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:nil completionHandler:nil];
	 
	}
	
	处理从网页等跳转过来 , 比如直接跳到第二模块的第二级控制器 , 实际上以及跳转了 ,tabbarItem还选中第一个 . 只需要在block块中处理一下selectedIndex就行
```
未解决问题 : 
1.  block块中 , 像push的下级传递参数问题 . 2. 传递参数为非框架中的类时 , 比如自定义模型  
总结: JLRoutes主要作用有两个 : 
1. 用于处理从网页跳转至app指定页面  
2. 多个应用间的互相跳转  
然而如果想要实现全部页面之间跳转 , 从而取代模态和push , 不太现实

## 最后 , 整体实现
UINavigationController分别包装了 OneViewController , TwoViewController , ThreeViewController , 然后分别为MYTabbarController的三个子控制器 .

现在咱们要实现的是 , 利用JLRoutes 可以从OneViewController跳转到下级界面OneNextViewController , TwoViewController跳转到下级页面TwoNextViewController , …..

AppDelegate类
``` swift
	import "AppDelegate.h"
	import "JLRoutes.h"
	import "MYTabbarViewController.h"
	 
	 
	@interface AppDelegate ()
	 
	@end
	 
	@implementation AppDelegate
	 
	 
	- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	 
	    self.window = [[UIWindow alloc]initWithFrame:[UIScreen mainScreen].bounds];
	 
	    self.window.rootViewController = [[MYTabbarViewController alloc]init];
	 
	    [self.window makeKeyAndVisible];
	 
	    return YES;
	}
	
	//openUrl方法   在此处对所有的跳转进行拦截 , 手动解析处理 , 再交于JLRoutes
	- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
	{
	 
	    NSString *str = url.absoluteString;
	    NSArray *arr = [str componentsSeparatedByString:@"://"];
	    if ([[arr.firstObject lowercaseString] isEqualToString:@"jlroutesone"]) {
	 
	        return [[JLRoutes routesForScheme:@"JLRoutesOne"]routeURL:url];
	 
	    }else if ([[arr.firstObject lowercaseString] isEqualToString:@"jlroutestwo"]){
	 
	        return [[JLRoutes routesForScheme:@"JLRoutesTwo"]routeURL:url];
	    }
	 
	    return [[JLRoutes routesForScheme:@"JLRoutesThree"]routeURL:url];
	}

MYTabbarController类
@interface MYTabbarViewController ()
 
@end
 
@implementation MYTabbarViewController
 
//添加子控制器 , 分别注册三个模块的跳转逻辑
	- (void)viewDidLoad {
	    [super viewDidLoad];
	 
	    OneViewController *oneVc = [[OneViewController alloc]init];
	    oneVc.title = @"一";
	 
	    UINavigationController *oneNav = [[UINavigationController alloc]initWithRootViewController:oneVc];
	    [self registerRouteWithA:oneNav];
	 
	    TwoViewController *twoVc = [[TwoViewController alloc]init];
	    UINavigationController *twoNav = [[UINavigationController alloc]initWithRootViewController:twoVc];
	    twoVc.title = @"二";
	    [self registerRouteWithB:twoNav];
	 
	    ThreeViewController *threeVc = [[ThreeViewController alloc]init];
	    UINavigationController *threeNav = [[UINavigationController alloc]initWithRootViewController:threeVc];
	    threeVc.title = @"三";
	    self.viewControllers = @[oneNav,twoNav,threeNav];
	    [self registerRouteWithC:threeNav];
	}
```
注册跳转逻辑如下 
下述的@”JLRoutesOne”,@”…Two”….均可随意拟定 , 仅为JLRoutes实例对象标识 , 不做任何要求 . 后面参数传递也是如此 , 自行拟定 
``` swift
	//第一模块跳转逻辑
	- (void)registerRouteWithA:(UINavigationController *)navVc
	{
	 
	    [[JLRoutes routesForScheme:@"JLRoutesOne"]addRoute:@"/:ViewController/:userID/:pass" handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters){
	 
	  //此处viewController key值对应的是 touch方法中的第一个值 , userID对应第二个值 , pass对应第三个 ...
	  //作者github上的实现 ?userID=123&pwd=321 这种方式传递参数我没有实现 , 不知道什么原因..
	        Class class = NSClassFromString(parameters[@"ViewController"]);
	 
	        NSLog(@"-----------userID : %@",parameters[@"userID"]);
	        NSLog(@"-----------pass   : %@",parameters[@"pass"]);
	        [navVc pushViewController:[[class alloc]init] animated:YES];
	        NSLog(@"-------------------第一模块");
	        self.selectedIndex = 0; //解决从app外跳转进来的tabbar选中问题
	        return YES;
	    }];
	}

	//第二模块跳转逻辑
	- (void)registerRouteWithB:(UINavigationController *)navVc
	{
	 
	    [[JLRoutes routesForScheme:@"JLRoutesTwo"]addRoute:@"/:ViewControllerTwo" handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters){
	 
	        Class class = NSClassFromString(parameters[@"ViewControllerTwo"]);
	 
	        [navVc pushViewController:[[class alloc]init] animated:YES];
	 
	        NSLog(@"-------------------第二模块");
	 
	        self.selectedIndex = 1;
	        return YES;
	 
	    }];
	}

	//第三模块跳转逻辑
	- (void)registerRouteWithC:(UINavigationController *)navVc
	{
	    [[JLRoutes routesForScheme:@"JLRoutesThree"]addRoute:@"/:ViewControllerThree" handler:^BOOL(NSDictionary<NSString *,id> * _Nonnull parameters){
	 
	 
	        Class class = NSClassFromString(parameters[@"ViewControllerThree"]);
	 
	        [navVc pushViewController:[[class alloc]init] animated:YES];
	 
	        self.selectedIndex = 2;
	        NSLog(@"-------------------第三模块");
	 
	        return YES;
	    }];
	}
```	
注意 : 下述方法的前面 , 需和info.plist文件中定义的3个schemes保持一致 . 分别对应着三个模块 , 用于appdelegate 中openUrl方法拦截时区分模块

OneViewController类
``` swift
	//第一模块按钮点击事件
	- (void)touch
	{
	 
	    NSString *url = @"JLRoutesOne://OneNextViewController/我是userID/我是pwd";
	 
	    //中文传输需要进行转义
	    url = [url stringByAddingPercentEncodingWithAllowedCharacters:[NSCharacterSet URLQueryAllowedCharacterSet]];
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:nil completionHandler:nil];
	 
	}

TwoViewController 类

	//第二模块按钮点击
	- (void)touch
	{
	    NSString *url = @"JLRoutesTwo://TwoNextViewController";
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:nil completionHandler:nil];
	 
	}
```
ThreeViewController类
``` swift
//第三模块按钮点击
	- (void)touch
	{
	    NSString *url = @"JLRoutesThree://ThreeNextViewController";
	 
	    [[UIApplication sharedApplication]openURL:[NSURL URLWithString:url] options:@{@"name":@"JLRoutesThree"} completionHandler:nil];
	 
	}
```
