# 天猫首页效果图

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf137657df2220?w=636&h=1420&f=png&s=539701)

# 开发环境
macOS Catalina 10.15 beta 7， xcode 11.0 beta 6

# SwiftUI编写天猫App
## 一、轮播图实现
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf125b5abd3add?w=636&h=1420&f=gif&s=4955033)
轮播图的这里实现是按照官网的例子来实现的，代码在工程的下图文件夹中：

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf139b59f18edd?w=1304&h=860&f=png&s=923091)
这里假设你已经熟悉了SwiftUI的基本写法。

1. 在PageView.swift中我们的body中的代码如下：
``` swift
    var body: some View {
        
        ZStack(alignment: .bottom) {
            
            /// 滑动控制器视图
            PageViewController(currentPage: $currentPage, offsetX: $offsetX, home: self.home, controllers: viewControllers)
                .background(Color.clear)
                .frame(height: 260)
            
            Text("")
                .preference(key: PageKeyTypes.PreKey.self, value: [PageKeyTypes.PreData(index: currentPage,offsetX: offsetX)])
            
            /// 新修改页数指示
            TMPageView().padding()
            
            
        }.onPreferenceChange(PageKeyTypes.PreKey.self) { values in
            self.home.index = values.first?.index ?? 0
        }
    }
```

 1）这里 PageViewController()是使用的UIPageViewController实现的，使用的UIKit的控制器，所以里面要遵循UIViewControllerRepresentable这个协议。

 2）Text("") 这一行代码主要是为了监听ScrollView的滚动事件,这里我们使用的是preference来实现。

 3） TMPageView() 这个是页码指示器。

1.1 PageViewController页面
  ```  swift
  struct PageViewController: UIViewControllerRepresentable
{
    typealias UIViewControllerType = UIPageViewController
    
    /// 当前页
    @Binding var currentPage: Int
    
    /// 当前页偏移量
    @Binding var offsetX: CGFloat

    /// 传递过来的首页全局数据
    var home: HomeGlobal
    
    var controllers: [UIViewController]
    func makeUIViewController(context: UIViewControllerRepresentableContext<PageViewController>) -> UIPageViewController {
        let pageViewController = UIPageViewController(
            transitionStyle: .scroll,
            navigationOrientation: .horizontal,options: [:])
        pageViewController.dataSource = context.coordinator
        pageViewController.delegate = context.coordinator

          /// 获取page内的scrollView
        let scrol = findScrollView(vc: pageViewController)
        scrol.delegate = context.coordinator
        return pageViewController
    }
    
    func updateUIViewController(_ uiViewController: UIPageViewController, context: UIViewControllerRepresentableContext<PageViewController>) {
        uiViewController.setViewControllers([controllers[currentPage]], direction: .forward, animated: true, completion: nil)
    }
    
    func findScrollView(vc: UIPageViewController) -> UIScrollView {
        for item in vc.view!.subviews {
            if item is UIScrollView {
                return item as! UIScrollView
            }
        }
        return UIScrollView()
    }
    
    class Coordinator: NSObject,UIPageViewControllerDataSource,UIPageViewControllerDelegate,UIScrollViewDelegate {
        var parent: PageViewController
        var home: HomeGlobal
        init(_ pageViewController: PageViewController,home: HomeGlobal) {
            self.parent = pageViewController
            self.home = home
        }
        
        /// 数据源代理
        func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController? {
            
            guard let index = parent.controllers.firstIndex(of: viewController) else {
                return nil
            }
            
            if index == 0 {
                return parent.controllers.last
            }
            return parent.controllers[index - 1]
        }
        
        func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController? {
            guard let index = parent.controllers.firstIndex(of: viewController) else {
                return nil
            }
            if index + 1 == parent.controllers.count {
                return parent.controllers.first
            }
            return parent.controllers[index + 1]
        }
        
        /// 代理方法
        func pageViewController(_ pageViewController: UIPageViewController, didFinishAnimating finished: Bool, previousViewControllers: [UIViewController], transitionCompleted completed: Bool) {
            if completed,
                let visibleViewController = pageViewController.viewControllers?.first,
                let index = parent.controllers.firstIndex(of: visibleViewController)
            {
                parent.currentPage = index
                
            }
        }
        
        /// 监听滚动视图距离
        func scrollViewDidScroll(_ scrollView: UIScrollView) {
            self.home.offsetX = scrollView.contentOffset.x
        }
    }
    
    func makeCoordinator() -> PageViewController.Coordinator {
        Coordinator(self, home: self.home)
    }
  
    
}

  ```
  
  1）这里面主要实现makeUIViewController 和 updateUIViewController，这里面主要实现makeUIViewController用于创建UIKit框架中的控制器，updateUIViewController更新的时候会调用到。
  
  2）class Coordinator这个类是一个协调者，用于实现SwiftUI框架和UIKit之前的链接。 我们使用Coordinator 来实现UIPageViewController的一些代理。
  
  3）因为要监听UIPageViewController的页面的滚动，所以这里我们添加findScrollView()这个方法来获取当前页面的UIScrollView视图，来监听滑动的偏移量。
  
  总结：这个页面主要实现了UIPageViewController代理和监听UIScrollview偏移量用来修改背景颜色的渐变效果。
  
 
1.2 Text("")
    
这里主要看下：
    
    ``` swift
    // preference类型
    struct PageKeyTypes {
    
    // preference 的value 类型
    struct PreData: Equatable{
        let index: Int
        let offsetX: CGFloat

    }
    // preference 的 key
    struct PreKey: PreferenceKey {
        static var defaultValue: [PreData] = []

        static func reduce(value: inout [PreData], nextValue: () -> [PreData]) {
            value.append(contentsOf: nextValue())
        }
        typealias Value = [PreData]

    }

}

    ```
  1） preference 这里使用它，可以为View设置任何事件，我们这里使用了PreData这个类型来监听这个View的index和offsetX。这两个值就可以获取到当前的索引和偏移量了。
  
  2） 当发生变化的时候，就会执行这里面onPreferenceChange，获取之后我们给首页的全局配置对象设置对应的值，这样我们就可以在其他任何View中获取我们的这些属性值了。
  
 1.3 TMPageView()
 
 ``` swift
 struct TMPageView: View {
    
    @EnvironmentObject var home: HomeGlobal
    var body: some View {
        
        ZStack(alignment: .leading) {
            Color(red: 200/255.0, green: 200/255.0, blue: 200/255.0)
                .frame(width: 150,height: 2)
                .cornerRadius(1)
            VStack {
                Color.white
                    .frame(width: 15,height: 2)
                    .cornerRadius(2)
        
            }.offset(x: CGFloat(self.home.index)*15, y: 0 )
            
                        
        }
    }
}
 ```
 这个视图只是指示器作用，根据传递进来的全局数据来设置对应的显示位置。
  
 1.4 这里是整个轮播图的预览View
 
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf15294867154e?w=3222&h=1452&f=png&s=2049856)
  
 loop.featureImage用来获取当前轮播图的图片Item。设置了图片的高度和圆角，距离顶部有一段的距离是用来设置顶部导航条的间距的。
 
 
 2. 轮播图后面的背景视图 TMHomeBackView
    
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf157f8edcf053?w=3168&h=1270&f=png&s=1718361)

这个视图我们是我们首页的背景图，用来显示一个默认背景图片，根据全局数据设置不同的颜色。
这里面主要使用Image这一个，其他的代码都是获取背景图片应该设置为什么颜色的代码逻辑。

``` swift 
struct TMHomeBackView: View {
    
    @EnvironmentObject var home: HomeGlobal
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Image("loopbg")
                .resizable()
                .frame(height: 450)
                .background(Color.init(getColor()))
            
        }
        .offset(x: 0, y: self.home.offsetY <= 0 ? self.home.offsetY : 0)
    }
    
    func getColor() ->  UIColor{
        
        /// 当前页
        let current = self.home.index
        
        /// 获取下一页的索引
        var nextIndex: Int = current
        
        
        /// 滑动比例
        let progress: CGFloat = abs((self.home.offsetX - self.home.width)/self.home.width)

        /// 滑动方向
        if self.home.offsetX - self.home.width >= 0 {
            nextIndex += 1
            if nextIndex > 9 {
                nextIndex = 0
            }
            if self.home.offsetX - self.home.width == 0 {
                nextIndex = 0
            }
        } else {
            
            nextIndex -= 1
            if nextIndex < 0 {
                nextIndex = 9
            }
            if  current == 0 {
                nextIndex = 0
            }
        }
        
        /// 当前颜色
        let currentColor: (r : CGFloat, g : CGFloat, b : CGFloat)
            = getRGBWithColor(getRGB(current))
        
    
        /// 下一个颜色
        let nextColor: (r : CGFloat, g : CGFloat, b : CGFloat)
            = getRGBWithColor(getRGB(nextIndex))

        print("\(currentColor)==\(nextColor)")
        
        /// 颜色变量
        let colorDelta = (currentColor.0 - nextColor.0, currentColor.1 - nextColor.1, currentColor.2 - nextColor.2)
        
        let finalColr: UIColor = UIColor(red: (currentColor.0 - colorDelta.0*progress) / 255.0, green: (currentColor.1 - colorDelta.1*progress) / 255.0, blue: (currentColor.2 - colorDelta.2*progress) / 255.0, alpha: 1)
        
        return finalColr
    }
    
    func getRGB(_ index: Int) -> UIColor {
        let color =   UIColor(red: CGFloat(loopData[index].colors.red)/255.0, green: CGFloat(loopData[index].colors.green)/255.0, blue: CGFloat(loopData[index].colors.blue)/255.0, alpha: 1)
        return color
    }
}
```

1）我们使用getColor方法来获取当前和下一页应该显示什么样的颜色。这里的颜色我们使用的是RGB颜色来进行渐变的。

## 二、自定义ScrollView
因为我们在使用中发现，SwiftUI中的ScrollView不在跟UIKit中的UIScrollView一样有代理方法，可以监听ScrollView的滚动事件。我们使用ScrollView(.vertical, showsIndicators: false)发现也只有设置横屏竖屏滚动，和是否显示滚动条的参数。这里好像SwiftUI中已经没有像UIKit中代理的一些东西了。在官网例子中也没有找到对应的实现，官网的例子中都是很简单的教你如何使用SwiftUI。在翻看gitHub上的一些文章后，找寻到了如何自定义实现ScrollView的滚动和如果实现下拉刷新等功能。
我们下面实现的自定义ScrollView是根据老外写的文章编写的：

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf161a1c3e43bb?w=2620&h=726&f=png&s=960526)

1.  RefreshScrollView的实现

``` swift 
var body: some View {
        VStack {
            ScrollView(.vertical, showsIndicators: false) {
                
                 ZStack(alignment: .top) {
                    /// 用于接收监听的视图
                    MovingView()
                    /// 填充传过来的视图
                    self.content
                }
            }
            .onPreferenceChange(RefreshableKeyTypes.PreKey.self) { values in
                
                /// 更新赋值
                self.home.offsetY = values.first?.bounds.origin.y ?? 0.0
                
                self.home.width = values.first?.bounds.size.width ?? 0.0
            }
        }
    }
```

1） RefreshScrollView中的body代码也是非常简单，这里还是主要是根据preference 和 onPreferenceChange 实现的。在前面监听滚动的时候我们已经使用过了。
2） 这里新增的也就多了一个  GeometryReader 这个是用来获取设备尺寸的，

 ``` swift 
 @available(iOS 13.0, OSX 10.15, tvOS 13.0, watchOS 6.0, *)
public struct GeometryProxy {

    /// The size of the container view.
    public var size: CGSize { get }

    /// Resolves the value of `anchor` to the container view.
    public subscript<T>(anchor: Anchor<T>) -> T { get }

    /// The safe area inset of the container view.
    public var safeAreaInsets: EdgeInsets { get }

    /// The container view's bounds rectangle converted to a defined
    /// coordinate space.
    public func frame(in coordinateSpace: CoordinateSpace) -> CGRect
}
 ```
 
 看这里是GeometryProxy的size就是获取设置宽度和高度的。
 
 3） self.content这里的content就是传递过来的显示的View
 
 
 2. 使用 RefreshScrollView
 
 ``` swift 
 struct TMHomeView: View {
    
    @State private var refresh: Bool = true
    @EnvironmentObject var home: HomeGlobal
    
    
    var body: some View {
        
        /// 导航总试图
        NavigationView {
            
            /// 整体叠加
            ZStack(alignment: .top) {
                
                /// 首页背景视图
                TMHomeBackView()
                
                /// 滚动视图
                RefreshScrollView(refreshing: $refresh) {
                    HomeContentView()
                }
                
                /// 顶部导航
                HomeNaviView()
 
            }
                /// 背景颜色
                .background(Color(red: 245/255.0, green: 245/255.0, blue: 245/255.0))
                /// 延伸到安全区域
                .edgesIgnoringSafeArea(.top)
                .navigationBarHidden(true)
        }
        
        
    }
}
 ```
 
 1） 使用的时候就非常简单了，跟其他系统的View使用一样
 
  ``` swift 
    RefreshScrollView(refreshing: $refresh) {
                    HomeContentView()
                }
  ```
  
  
##  三、 其他View的实现
    
  1. 这里就挑一个导航条的代码实现
  
![](https://user-gold-cdn.xitu.io/2019/9/2/16cf16cbed692966?w=3222&h=854&f=png&s=1259453)
  
  ``` swift 
  struct HomeNaviView: View {
    
    @EnvironmentObject var home: HomeGlobal
    @State private var name: String = ""
    
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            
            /// 顶部安全区域
            Color.red
                .frame(height: 44)
            
            /// 底部导航栏
            HStack {
                
                Image("camera_Normal")
                    .padding(EdgeInsets(top: 5, leading: 15, bottom: 5, trailing: 5))
                /// 导航条位置
                HStack{
                    
                    Image("iconfont-search")
                        .padding(EdgeInsets(top: 7, leading: 5, bottom: 8, trailing: 5))
                    TextField("智能家居HongMeng", text: $name)
                    Image("tmas_entry_pop_icon")
                        .padding(EdgeInsets(top: 7, leading: 5, bottom: 8, trailing: 5))
                    
                    
                }
                .background(
                    Color.white
                        .cornerRadius(4)
                )
                    .frame(height: 50)
                
                Image("detail_button_cart")
                    .padding(.leading, 10)
                    .padding(.trailing, 5)
                Image("frontpage_message_btn")
                    .padding(.leading, 5)
                    .padding(.trailing, 10)
                
            }
                
            .background(Color.red)
        }
        
    }
}
  ```
  
  
  1）使用了图片、文本、输入框等View的组合。
  
  2） 其他View的实现主要看代码吧，写法都是一样的实现起来很简单。
  
  
## 四、整体预览

![](https://user-gold-cdn.xitu.io/2019/9/2/16cf170145e37edf?w=636&h=1420&f=gif&s=4866683)

## 五、总结

1. 使用了SwiftUI编写程序，如果学会了，写起来就非常的简单了，写的布局UI效果立马就会展现在眼前，再也不用重新运行了。开发速度变快了很多。
2. 和flutter相比较，flutter代码结构更加的嵌套，修改起来还得一个个的去找在哪个层级。SwiftUI
写起来层级还是看着比较简洁点。
3. SwiftUI只是苹果系的跨平台，而flutter是很多平台了。

## 六、其他疑问？

1. SwiftUI 中还有很多不会使用的，比如:  NavigationLink 跳转到其他View 页面，我们想自定义实现返回按钮，还不知道点击按钮后如何pop到上一个页面。
2. SwiftUI好像也没有返回系统返回手势。




奉上上面所有的 [代码示例](https://github.com/pan372728544/Tmall-SwiftUI)，以供参考，共同学习；

  
  
  
 