#  Flutter  - flutter_boost原理flutter端


## Map存储

``` dart
   FlutterBoost.singleton.registerPageBuilders({
      'first': (pageName,  params, _) => FirstRouteWidget(),
      'second': (pageName, params, _) => SecondRouteWidget(),
      'tab': (pageName, params, _) => TabRouteWidget(),
      ///可以在native层通过 getContainerParams 来传递参数
      'flutterPage': (pageName, params, _) {
        print("flutterPage params:$params");
        return FlutterRouteWidget();
      },
    });
```
类型， 一个页面名称 对应一个PageBuilder(包含名称，参数和标识符)
``` dart
Map<String, PageBuilder>
typedef Widget PageBuilder(String pageName, Map params, String uniqueId);
```

注册Map
``` dart
  ///Register a map builders
  void registerPageBuilders(Map<String, PageBuilder> builders) {
    ContainerCoordinator.singleton.registerPageBuilders(builders);
  }
```
将数据添加到 Map中
``` dart
  final Map<String, PageBuilder> _pageBuilders = <String, PageBuilder>{};

  void registerPageBuilders(Map<String, PageBuilder> builders) {
    if (builders?.isNotEmpty == true) {
      _pageBuilders.addAll(builders);
    }
  }
```

## 读取Map数据

 ``` dart
 @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Boost example',
        builder: FlutterBoost.init(postPush: _onRoutePushed),
        home: Container());
  }

  void _onRoutePushed(
      String pageName, String uniqueId, Map params, Route route, Future _) {
  }
  
  ```
在 builder: FlutterBoost.init(postPush: _onRoutePushed),进行读取

``` dart

  static TransitionBuilder init(
      {TransitionBuilder builder,
      PrePushRoute prePush,
      PostPushRoute postPush}) {
    if (Platform.isAndroid) {
      onPageStart();
    } else if (Platform.isIOS) {
      assert(() {
        () async {
          onPageStart();
        }();
        return true;
      }());
    }

    return (BuildContext context, Widget child) {
      assert(child is Navigator, 'child must be Navigator, what is wrong?');

      final BoostContainerManager manager = BoostContainerManager(
          key: _instance.containerManagerKey,
          initNavigator: child,
          prePushRoute: prePush,
          postPushRoute: postPush);

      if (builder != null) {
        return builder(context, manager);
      } else {
        return manager;
      }
    };
  }
```
onPageStart中调用pageOnStart 获取原生页面中的页面信息
``` dart
  static void onPageStart() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      singleton.channel.invokeMethod<Map>('pageOnStart').then((Map pageInfo) {
        if (pageInfo == null || pageInfo.isEmpty) return;

        if (pageInfo.containsKey("name") &&
            pageInfo.containsKey("params") &&
            pageInfo.containsKey("uniqueId")) {
          ContainerCoordinator.singleton.nativeContainerDidShow(
              pageInfo["name"], pageInfo["params"], pageInfo["uniqueId"]);
        }
      });
    });
  }
```

``` dart
  bool nativeContainerDidShow(String name, Map params, String pageId) {
    FlutterBoost.containerManager
        ?.showContainer(_createContainerSettings(name, params, pageId));

    //对无障碍辅助模式的兼容
    try {
      final SemanticsOwner owner =
          WidgetsBinding.instance.pipelineOwner?.semanticsOwner;
      final SemanticsNode root = owner?.rootSemanticsNode;
      root?.detach();
      root?.attach(owner);
    } catch (e) {
      assert(false, e.toString());
    }

    performContainerLifeCycle(_createContainerSettings(name, params, pageId),
        ContainerLifeCycle.Appear);

    Logger.log(
        'native containner did show-$name,\nmanager dump:\n${FlutterBoost.containerManager?.dump()}');

    return true;
  }
```

获取页面
``` dart
  BoostContainerSettings _createContainerSettings(
      String name, Map params, String pageId) {
    Widget page;

    final BoostContainerSettings routeSettings = BoostContainerSettings(
        uniqueId: pageId,
        name: name,
        params: params,
        builder: (BuildContext ctx) {
          //Try to build a page using keyed builder.
          if (_pageBuilders[name] != null) {
            page = _pageBuilders[name](name, params, pageId);
          }

          //Build a page using default builder.
          if (page == null && _defaultPageBuilder != null) {
            page = _defaultPageBuilder(name, params, pageId);
          }

          assert(page != null);
          Logger.log('build widget:$page for page:$name($pageId)');

          return page;
        });

    return routeSettings;
  }
```

显示选定的页面
``` dart
  void showContainer(BoostContainerSettings settings) {
    if (settings.uniqueId == _onstage.settings.uniqueId) {
      _onShownContainerChanged(null, settings.uniqueId);
      return;
    }

    final int index = _offstage.indexWhere((BoostContainer container) =>
        container.settings.uniqueId == settings.uniqueId);
    if (index > -1) {
      _offstage.add(_onstage);
      _onstage = _offstage.removeAt(index);

      setState(() {});

      for (BoostContainerObserver observer in FlutterBoost
          .singleton.observersHolder
          .observersOf<BoostContainerObserver>()) {
        observer(ContainerOperation.Onstage, _onstage.settings);
      }
      Logger.log('ContainerObserver#2 didOnstage');
    } else {
      pushContainer(settings);
    }
  }
  ```
  
  ``` dart
    void pushContainer(BoostContainerSettings settings) {
    assert(settings.uniqueId != _onstage.settings.uniqueId);
    assert(_offstage.every((BoostContainer container) =>
        container.settings.uniqueId != settings.uniqueId));

    _offstage.add(_onstage);
    _onstage = BoostContainer.obtain(widget.initNavigator, settings);

    setState(() {});

    for (BoostContainerObserver observer in FlutterBoost
        .singleton.observersHolder
        .observersOf<BoostContainerObserver>()) {
      observer(ContainerOperation.Push, _onstage.settings);
    }
    Logger.log('ContainerObserver#2 didPush');
  }
  
  ```
  
  ``` dart
  factory BoostContainer.obtain(
          Navigator navigator, BoostContainerSettings settings) =>
      BoostContainer(
          key: GlobalKey<BoostContainerState>(),
          settings: settings,
          onGenerateRoute: (RouteSettings routeSettings) {
            if (routeSettings.name == '/') {
              return BoostPageRoute<dynamic>(
                  pageName: settings.name,
                  params: settings.params,
                  uniqueId: settings.uniqueId,
                  animated: false,
                  settings: routeSettings,
                  builder: settings.builder);
            } else {
              return navigator.onGenerateRoute(routeSettings);
            }
          },
          observers: <NavigatorObserver>[
            ContainerNavigatorObserver.bindContainerManager()
          ],
          onUnknownRoute: navigator.onUnknownRoute);
          
          
```










