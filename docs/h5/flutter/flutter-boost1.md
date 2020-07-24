#  Flutter  - flutter_boost原理iOS端


## 入口 创建FlutterEngine

Flutter创建engine，注册插件流程代码

``` swift
 FlutterBoostPlugin.sharedInstance().startFlutter(with: SwiftPlatform()) { (engin) in
            
        }
```
FlutterBoostPlugin 调用 startFlutterWithPlatform

``` swift
- (void)startFlutterWithPlatform:(id<FLBPlatform>)platform
                          engine:(FlutterEngine *)engine
           pluginRegisterred:(BOOL)registerPlugin
                         onStart:(void (^)(FlutterEngine * _Nonnull))callback{
    static dispatch_once_t onceToken;
    __weak __typeof__(self) weakSelf = self;
    dispatch_once(&onceToken, ^{
        __strong __typeof__(weakSelf) self = weakSelf;
        FLBFactory *factory = FLBFactory.new;
        self.application = [factory createApplication:platform];
        [self.application startFlutterWithPlatform:platform
                                     withEngine:engine
                                      withPluginRegisterred:registerPlugin
                                       onStart:callback];
    });
}
```
使用 FLBFlutterApplication  调用startFlutterWithPlatform

``` swift
- (void)startFlutterWithPlatform:(id<FLBPlatform>)platform
                      withEngine:(FlutterEngine* _Nullable)engine
                        withPluginRegisterred:(BOOL)registerPlugin
                         onStart:(void (^)(FlutterEngine *engine))callback
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        self.platform = platform;
        self.viewProvider = [[FLBFlutterEngine alloc] initWithPlatform:platform engine:engine];
        self.isRunning = YES;
        if(registerPlugin){
            Class clazz = NSClassFromString(@"GeneratedPluginRegistrant");
            FlutterEngine *myengine = [self.viewProvider engine];
            if (clazz && myengine) {
                if ([clazz respondsToSelector:NSSelectorFromString(@"registerWithRegistry:")]) {
                    [clazz performSelector:NSSelectorFromString(@"registerWithRegistry:")
                                withObject:myengine];
                }
            }
        }
        if(callback) callback(self.viewProvider.engine);
    });
}
```
通过        self.viewProvider = [[FLBFlutterEngine alloc] initWithPlatform:platform engine:engine]; 来创建FlutterEngine，如果传递为空的engine就创建一个
``` swift
- (instancetype)initWithPlatform:(id<FLBPlatform> _Nullable)platform engine:(FlutterEngine * _Nullable)engine
{
#pragma clang diagnostic push
#pragma clang diagnostic ignored "-Warc-performSelector-leaks"
    
    if (self = [super init]) {
        if(!engine){
            _engine = [[FlutterEngine alloc] initWithName:@"io.flutter" project:nil];
        }else{
            _engine = engine;
        }
        if(platform &&
           [platform respondsToSelector: @selector(entryForDart)] &&
           platform.entryForDart){
            [_engine runWithEntrypoint:platform.entryForDart];
        }else{
            [_engine runWithEntrypoint:nil];
        }
    }
    
    return self;
#pragma clang diagnostic pop
}
```
通过执行 [_engine runWithEntrypoint:platform.entryForDart]; 来指定默认开始的dart函数，如果platform.entryForDart为空就默认执行flutter项目中的main函数
调用GeneratedPluginRegistrant flutter插件注册功能
回调生成的engine

## 创建Flutter页面，指定Flutter页面
FLBFlutterViewContainer页面创建，这是name
``` swift
   let flutterVC1 = FLBFlutterViewContainer.init()
   flutterVC1 .setName("first", params: [:])
```

设置name
``` swift
- (void)setName:(NSString *)name params:(NSDictionary *)params
{
    if(!_name && name){
        _name = name;
        _params = params;
    }
}
```

添加到父类视图的时候调用,
``` swift
- (void)willMoveToParentViewController:(UIViewController *)parent {
    if (parent && _name) {
        //当VC将要被移动到Parent中的时候，才出发flutter层面的page init
        [BoostMessageChannel didInitPageContainer:^(NSNumber *r) {}
               pageName:_name
                 params:_params
               uniqueId:[self uniqueIDString]];
    }
    [super willMoveToParentViewController:parent];
}
```


BoostMessageChannel 主要通过channe和dart进行通信,显示指定的页面
``` swift
 + (void)didInitPageContainer:(void (^)(NSNumber *))result pageName:(NSString *)pageName params:(NSDictionary *)params uniqueId:(NSString *)uniqueId
 {
     if ([pageName isEqualToString:kIgnoreMessageWithName]) {
         return;
     }
     
     NSMutableDictionary *tmp = [NSMutableDictionary dictionary];
     if(pageName) tmp[@"pageName"] = pageName;
     if(params) tmp[@"params"] = params;
     if(uniqueId) tmp[@"uniqueId"] = uniqueId;
     [self.methodChannel invokeMethod:@"didInitPageContainer" arguments:tmp result:^(id tTesult) {
         if (result) {
             result(tTesult);
         }
     }];
     
     [FlutterBoostPlugin.sharedInstance.application didInitPageContainer:pageName
                                                                  params:params
                                                                uniqueId:uniqueId];
 }
```
 ## FLBFlutterViewContainer
继承自FlutterViewController，init时会将创建好的engine传递给FlutterViewController
``` swift
- (instancetype)init
{
    [FLUTTER_APP.flutterProvider prepareEngineIfNeeded];
    if(self = [super initWithEngine:FLUTTER_APP.flutterProvider.engine
                            nibName:_flbNibName
                            bundle:_flbNibBundle]){
        //NOTES:在present页面时，默认是全屏，如此可以触发底层VC的页面事件。否则不会触发而导致异常
        self.modalPresentationStyle = UIModalPresentationFullScreen;

        [self _setup];
    }
    return self;
}
```
flutter页面消失是进行通知dart去移除页面
``` swift
- (void)didMoveToParentViewController:(UIViewController *)parent {
    if (!parent) {
        //当VC被移出parent时，就通知flutter层销毁page
        [self notifyWillDealloc];
    }
    [super didMoveToParentViewController:parent];
}
- (void)dismissViewControllerAnimated:(BOOL)flag completion:(void (^)(void))completion {

    [super dismissViewControllerAnimated:flag completion:^(){
        if (completion) {
            completion();
        }
        //当VC被dismiss时，就通知flutter层销毁page
        [self notifyWillDealloc];
    }];
}

- (void)notifyWillDealloc
{
    [BoostMessageChannel willDeallocPageContainer:^(NSNumber *r) {}
                                               pageName:_name params:_params
                                               uniqueId:[self uniqueIDString]];

    [FLUTTER_APP removeViewController:self];
    
    [self.class instanceCounterDecrease];
}
```

进行唯一标示的自增
``` swift
static NSUInteger kInstanceCounter = 0;

+ (NSUInteger)instanceCounter
{
    return kInstanceCounter;
}

+ (void)instanceCounterIncrease
{
    kInstanceCounter++;
    if(kInstanceCounter == 1){
        [FLUTTER_APP resume];
    }
}

+ (void)instanceCounterDecrease
{
    kInstanceCounter--;
    if([self.class instanceCounter] == 0){
        [FLUTTER_APP pause];
    }
}

- (NSString *)uniqueIDString
{
    return @(_identifier).stringValue;
}
```

通知告诉 dart 页面的生命周期
``` swift
- (void)viewDidAppear:(BOOL)animated
{
    [FLUTTER_APP addUniqueViewController:self];
    
    //Ensure flutter view is attached.
    [self attatchFlutterEngine];
 
    [BoostMessageChannel didShowPageContainer:^(NSNumber *result) {}
                                           pageName:_name
                                             params:_params
                                           uniqueId:self.uniqueIDString];
    //NOTES：务必在show之后再update，否则有闪烁; 或导致侧滑返回时上一个页面会和top页面内容一样
    [self surfaceUpdated:YES];
    
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
    [BoostMessageChannel willDisappearPageContainer:^(NSNumber *result) {}
                                                 pageName:_name
                                                   params:_params
                                                 uniqueId:self.uniqueIDString];
    [[[UIApplication sharedApplication] keyWindow] endEditing:YES];
    [super viewWillDisappear:animated];
}


- (void)viewDidDisappear:(BOOL)animated
{
    [BoostMessageChannel didDisappearPageContainer:^(NSNumber *result) {}
                                                pageName:_name
                                                  params:_params
                                                uniqueId:self.uniqueIDString];
    [super bridge_viewDidDisappear:animated];
    
    if (self.engine.viewController == self) {
        [self detatchFlutterEngine];
    }
}
```

## FLBFactory
创建FLBFlutterApplication
``` swift

- (id<FLBFlutterApplicationInterface>)createApplication:(id<FLBPlatform>)platform
{
    return [FLBFlutterApplication new];
}

- (id<FLBFlutterContainer>)createFlutterContainer
{
    return FLBFlutterViewContainer.new;
}
```
## FLBFlutterContainerManager
管理页面和页面唯一标示的类

## FLBFlutterApplication

_manager 管理页面名称和唯一标示，_pageResultCallbacks 管理页面打开关闭回调，_callbackCache保存回调
``` swift
- (instancetype)init
{
    if (self = [super init]) {
        _manager = [FLBFlutterContainerManager new];
        _pageResultCallbacks = NSMutableDictionary.new;
        _callbackCache = NSMutableDictionary.new;
        
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(applicationWillEnterForeground:)
                                                     name:UIApplicationWillEnterForegroundNotification
                                                   object:nil];
        
        [[NSNotificationCenter defaultCenter] addObserver:self
                                                 selector:@selector(applicationDidEnterBackground:)
                                                     name:UIApplicationDidEnterBackgroundNotification
                                                   object:nil];
    }
    return self;
}

```


## FLBFlutterEngine
 创建FlutterEngine，管理生命周期

 ``` swift
 
 _engine = [[FlutterEngine alloc] initWithName:@"io.flutter" project:nil];
 
 - (void)pause
{
    [[_engine lifecycleChannel] sendMessage:@"AppLifecycleState.paused"];
    [self detach];
}

- (void)resume
{
    [[_engine lifecycleChannel] sendMessage:@"AppLifecycleState.resumed"];
}

- (void)inactive
{
    [[_engine lifecycleChannel] sendMessage:@"AppLifecycleState.inactive"];
}


- (void)didEnterBackground
{
    [BoostMessageChannel sendEvent:@"lifecycle"
                         arguments:@{@"type":@"background"}];
}

- (void)willEnterForeground
{
    [BoostMessageChannel sendEvent:@"lifecycle"
                         arguments:@{@"type":@"foreground"}];
}

 ```


## BoostMessageChannel
发送消息通知管理页面的打开关闭状态











