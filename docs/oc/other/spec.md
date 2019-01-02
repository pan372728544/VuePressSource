# 创建私有的Spec Repo


一、创建私有的Spec Repo (备注：Git仓库1)

二、创建Pod项目工程，并且有可以访问的项目版本控制地址 (备注：Git仓库2)

三、创建并提交MyLibPod库的podspec文件到私有Spec Repo仓库

四、使用制作好的Pod

说明：在以上步骤一、二中需要创建两个Git创库: 
1、Git仓库1的作用类似于CocoaPods的官方spec repo专门存放podspec
具体可以参考:CocoaPods官方源、Specs;
2、Git仓库2的是私有库的源码Git版本控制地址。

##  一、创建私有的Spec Repo

Spec Repo 是所有的Pods的一个索引，是所有公开的Pods 的podspec 文件的一个仓库，其实就是一个部署在服务器的Git仓库，当你使用CocoaPods 后它会被Clone到本地的 ~/.cocoapods/repos 目录下,大概的文件目录如下:

	.
	├── MySpecs
	│   ├── MyLib
	│   │   └── 0.1.1
	│   │       └── MyLib.podspec
	│   └── README.md
	└── master
	    ├── CocoaPods-version.yml
	    ├── README.md
	    └── Specs
	        ├── !ProtoCompiler
	        │   ├── 3.0.0
	        │   ├── 3.0.0-beta-3.1
	        │   └── 3.0.0-beta-4
	        ├── !ProtoCompiler-gRPCPlugin
	        │   ├── 0.14.0
	        │   ├── 1.0.0
	        │   ├── 1.0.0-pre1
	        │   ├── 1.0.0-pre1.1
	        │   └── 1.0.0-pre1.2

Tip：~/.cocoapods/repos文件是一个隐藏目录，在Mac 上默认是看不到隐藏目录的，但是我们可以通过「终端」应用程序打开。在Terminal中执行以下命令显示隐藏文件:

	$ defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder 
执行以下命令恢复隐藏文件:

	$ defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder 
上文的目录树形图就是我电脑的本地的 ~/.cocoapods/repos目录，其中master就是官方的Sepc Repo,跟master同目录级别的MySpecs目录就是我自己的创建的私有Sepc Repo。

1、首先在coding.net上创建一个MySpecs项目,当然你也是可以在公司内网创建的。
2、然后在Terminal中执行以下命令

	# pod repo add [Private Repo Name] [GitHub HTTPS clone URL]
	$ pod repo add MySpecs https://git.coding.net/kensla/MySpecs.git
注意：这个Git 仓库地址要换成你自己的创建的 Specs git 地址！！！ 
成功后会在~/.cocoapods/repos目录下就能看到MySpecs了，至此，第一步创建私有
Spec Repo就完成了。

## 二、创建Pod项目工程

1.创建Pod项目工程 
首先，在coding.net上创建一个MyLib项目,当然你也是可以在公司内网创建的。
然后，使用Cocoapods提供的一个Using Pod Lib Create 工具创建一个工程。

在Terminal中执行cd进入要创建项目的目录然后 执行以下命令：

二、创建Pod项目工程

1.创建Pod项目工程 
首先，在coding.net上创建一个MyLib项目,当然你也是可以在公司内网创建的。
然后，使用Cocoapods提供的一个Using Pod Lib Create 工具创建一个工程。

在Terminal中执行cd进入要创建项目的目录然后 执行以下命令：

二、创建Pod项目工程

1.创建Pod项目工程 
首先，在coding.net上创建一个MyLib项目,当然你也是可以在公司内网创建的。
然后，使用Cocoapods提供的一个Using Pod Lib Create 工具创建一个工程。

在Terminal中执行cd进入要创建项目的目录然后 执行以下命令：

	#pod lib create [项目名]
	$pod lib create MyLib
接着在Terminal控制台会输出：

	Cloning `https://github.com/CocoaPods/pod-template.git` into `MyLib`.
	Configuring MyLib template.
	------------------------------
	To get you started we need to ask a few questions, this should only take a minute.
	If this is your first time we recommend running through with the guide: 
	- http://guides.cocoapods.org/making/using-pod-lib-create.html
	( hold cmd and double click links to open in a browser. )
	What language do you want to use?? [ Swift / ObjC ]
	> ObjC
第一个问题是问你选择Swift还是Objc构建项目。此教程 选的是ObjC
	
	Would you like to include a demo application with your library? [ Yes / No ]
	> Yes
第二个问题问你是否需要创建一个Demo项目，此教程选的是Yes

	Which testing frameworks will you use? [ Specta / Kiwi / None ]
	> Specta
第三个问题让你是否选择一个测试框架，此教程选 Specta

	Would you like to do view based testing? [ Yes / No ]
	 > Yes

第四个问题是否基于View测试，选Yes

	What is your class prefix?
	> ZYK
第五个问题是询问 类的前缀，设为ZYK

设置完成后控制台输出:

	Running pod install on your new library.
	
	[!] No `Podfile' found in the project directory.
	
	Ace! you're ready to go!
	
	We will start you off by opening your project in Xcode
	
	open 'MyLib/Example/MyLib.xcworkspace'
	
	The file /Users/ken/Desktop/工作/MyLib/Example/MyLib.xcworkspace  does not exist.
	
	To learn more about the template see `https://github.com/CocoaPods/ pod-template.git`.
	
	To learn more about creating a new pod, see 
	`http://guides.cocoapods.org/making/making-a-cocoapod`.
成功后会在目录中创建好一个MyLib工程，结构如下：

	Mylib
	├── Example ** 这个是第二个问题的 Demo项目 
	│   ├── MyLib
	│   │   ├── Images.xcassets
	│   │   │   ├── AppIcon.appiconset
	│   │   │   │   └── Contents.json
	│   │   │   └── LaunchImage.launchimage
	│   │   │       └── Contents.json
	│   │   ├── Main.storyboard
	│   │   ├── MyLib-Info.plist
	│   │   ├── MyLib-Prefix.pch
	│   │   ├── ZYKAppDelegate.h
	│   │   ├── ZYKAppDelegate.m
	│   │   ├── ZYKViewController.h
	│   │   ├── ZYKViewController.m
	│   │   ├── en.lproj
	│   │   │   └── InfoPlist.strings
	│   │   └── main.m
	│   ├── MyLib.xcodeproj
	│   │   ├── project.pbxproj
	│   │   ├── project.xcworkspace
	│   │   │   └── contents.xcworkspacedata
	│   │   └── xcshareddata
	│   │       └── xcschemes
	│   │           └── MyLib-Example.xcscheme
	│   ├── Podfile
	│   └── Tests
	│       ├── Tests-Info.plist
	│       ├── Tests-Prefix.pch
	│       ├── Tests.m
	│       └── en.lproj
	│           └── InfoPlist.strings
	├── LICENSE
	├── MyLib
	│   ├── Assets
	│   └── Classes
	│       └── ReplaceMe.m **注意存放你自己实现的库相关代码！！！**
	├── MyLib.podspec  ** 库的podspec文件，这个是下一步需要重点配置的文件 ！！！**
	├── README.md
	└── _Pods.xcodeproj -> Example/Pods/Pods.xcodeproj

2、添加实现代码
├── MyLib
│   ├── Assets
│   └── Classes
│       └── ReplaceMe.m **注意存放你自己实现的库相关代码！！！**

在本教程中我在上面的Classes文件目录添加了 MyLib.h、UIColor+Fetch.h、UIColor+Fetch.m 等几个文件。现在目录结构如下:

	.
	├── Example
	│   ├── Build
	│   │   ├── Intermediates
	│   │   │   ├── MyLib.build
	│   │   │   ├── Pods.build
	│   │   │   └── PrecompiledHeaders
	│   │   └── Products
	│   │       └── Debug-iphoneos
	│   ├── MyLib
	│   │   ├── Images.xcassets
	│   │   │   ├── AppIcon.appiconset
	│   │   │   └── LaunchImage.launchimage
	│   │   ├── Main.storyboard
	│   │   ├── MyLib-Info.plist
	│   │   ├── MyLib-Prefix.pch
	│   │   ├── ZYKAppDelegate.h
	│   │   ├── ZYKAppDelegate.m
	│   │   ├── ZYKViewController.h
	│   │   ├── ZYKViewController.m
	│   │   ├── en.lproj
	│   │   │   └── InfoPlist.strings
	│   │   └── main.m
	│   ├── MyLib.xcodeproj
	│   │   ├── project.pbxproj
	│   │   ├── project.xcworkspace
	│   │   │   ├── contents.xcworkspacedata
	│   │   │   └── xcuserdata
	│   │   ├── xcshareddata
	│   │   │   └── xcschemes
	│   │   └── xcuserdata
	│   │       └── zhongyuanke.xcuserdatad
	│   ├── MyLib.xcworkspace
	│   │   ├── contents.xcworkspacedata
	│   │   └── xcuserdata
	│   │       └── zhongyuanke.xcuserdatad
	│   ├── Podfile
	│   ├── Podfile.lock
	│   ├── Pods
	│   │   ├── Expecta
	│   │   │   ├── Expecta
	│   │   │   ├── LICENSE
	│   │   │   └── README.md
	│   │   ├── Expecta+Snapshots
	│   │   │   ├── EXPMatchers+FBSnapshotTest.h
	│   │   │   ├── EXPMatchers+FBSnapshotTest.m
	│   │   │   ├── ExpectaObject+FBSnapshotTest.h
	│   │   │   ├── ExpectaObject+FBSnapshotTest.m
	│   │   │   ├── LICENSE.md
	│   │   │   └── README.md
	│   │   ├── FBSnapshotTestCase
	│   │   │   ├── FBSnapshotTestCase
	│   │   │   ├── LICENSE
	│   │   │   └── README.md
	│   │   ├── Headers
	│   │   ├── Local\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Podspecs
	│   │   │   └── MyLib.podspec.json
	│   │   ├── Manifest.lock
	│   │   ├── MyLib
	│   │   │   ├── LICENSE
	│   │   │   ├── MyLib
	│   │   │   └── README.md
	│   │   ├── Pods.xcodeproj
	│   │   │   ├── project.pbxproj
	│   │   │   ├── project.xcworkspace
	│   │   │   └── xcuserdata
	│   │   ├── Specta
	│   │   │   ├── LICENSE
	│   │   │   ├── README.md
	│   │   │   └── Specta
	│   │   └── Target\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Support\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ Files
	│   │       ├── Expecta
	│   │       ├── Expecta+Snapshots
	│   │       ├── FBSnapshotTestCase
	│   │       ├── MyLib
	│   │       ├── Pods-MyLib_Example
	│   │       ├── Pods-MyLib_Tests
	│   │       └── Specta
	│   └── Tests
	│       ├── Tests-Info.plist
	│       ├── Tests-Prefix.pch
	│       ├── Tests.m
	│       └── en.lproj
	│           └── InfoPlist.strings
	├── LICENSE
	├── MyLib
	│   ├── Assets
	│   └── Classes     ## 把你的库代码放在这个Classes文件夹 ！！！##
	│       ├── MyLib.h
	│       └── UIColor+Category
	│           ├── UIColor+Fetch.h 
	│           └── UIColor+Fetch.m
	├── MyLib.podspec
	├── RE.md
	├── README.md
	└── _Pods.xcodeproj -> Example/Pods/Pods.xcodeproj

3.开发模式下测试pod库的代码 
打开Example工程目录Podfile文件：

	pod 'MyLib', :path => '../' # 指定路径
	#pod 'MyLib', :podspec => '../MyLib.podspec'  # 指定podspec文件
然后在Example工程目录下执行 pod update命令安装依赖，打开项目工程，可以看到库文件都被加载到Pods子项目中了
不过它们并没有在Pods目录下，而是跟测试项目一样存在于Development Pods/MyLib中，这是因为我们是在本地测试，而没有把podspec文件添加到Spec Repo中的缘故。测试库文件没有问题,接着我们需要执行第4步

4.提交Pod库到Git仓库2 
在Terminal中执行 cd进入MyLib项目根目录然后，执行以下命令：

	$ git add .
	$ git commit -s -m "初始化MyLib 库"
	$ git remote add origin git@git.coding.net:kensla/MyLib.git           #添加远端仓库
	$ git push origin master     #提交到远端仓库
	$ git tag -m "first release" "0.1.0" #打上标签，这个很重要
	$ git push --tags     #推送tag到远端仓库
到这里，成功提交到远程 Git仓库2，MyLib Pod 库就初步完成了代码实现

## 三、创建并提交MyLibPod库的podspec文件到私有Spec Repo仓库

1.配置MyLibPod库的podspec 文件

	#
	# Be sure to run `pod lib lint MyLib.podspec' to ensure this is a
	# valid spec before submitting.
	#
	# Any lines starting with a # are optional, but their use is encouraged
	# To learn more about a Podspec see http://guides.cocoapods.org/syntax/podspec.html
	#
	
	Pod::Spec.new do |s|
	  #名称
	  s.name             = 'MyLib'
	  #版本号
	  s.version          = '0.1.0'
	  #简介
	  s.summary          = '这个是我的私有库项目Demo.'
	
	# This description is used to generate tags and improve search results.
	#   * Think: What does it do? Why did you write it? What is the focus?
	#   * Try to keep it short, snappy and to the point.
	#   * Write the description between the DESC delimiters below.
	#   * Finally, don't worry about the indent, CocoaPods strips it!
	
	  s.description      = <<-DESC
	  这个是教程的 私有库项目 学习Demo.
	                       DESC
	  #主页,这里要填写可以访问到的地址，不然验证不通过
	  s.homepage         = 'https://coding.net/u/kensla'
	
	  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
	
	  #开源协议
	
	  s.license          =   { :type => 'MIT', :file => 'LICENSE' }
	
	  #作者
	  s.author           = { 'kensla' => '604217454@qq.com' }
	
	  #项目地址，这里不支持ssh的地址，验证不通过，只支持HTTP和HTTPS，最好使用HTTPS。
	  #这里的s.source须指向存放源代码的链接地址，而不是托管spec文件的repo地址
	  s.source           = { :git => 'https://git.coding.net/kensla/MyLib.git', :tag => "0.1.0" }
	
	  #s.social_media_url = 'http://weibo.com/kensla'
	
	  #支持的平台及版本
	  s.ios.deployment_target = '7.0'
	
	  #代码源文件地址，**/*表示Classes目录及其子目录下所有文件，如果有多个目录下则
	  #用逗号分开，如果需要在项目中分组显示，这里也要做相应的设置
	
	  s.source_files = "MyLib/Classes/**/*"
	
	  #资源文件地址
	  # s.resource_bundles = {
	  #   'MyLib' => ['MyLib/Assets/*.png']
	  # }
	
	  #公开头文件地址
	  #s.public_header_files = 'MyLib/Classes/DDCommonBase.h'
	
	  #所需的framework，多个用逗号隔开
	  s.frameworks = 'UIKit'
	
	  #依赖关系，该项目所依赖的其他库，如果有多个需要填写多个s.dependency
	  # s.dependency 'AFNetworking', '~> 2.3'
	end
打开MyLib工程目录下的MyLib.podspec 文件并参考上面的说明配置好相关选项。podspec更多配置请参考:官方文档

2.编辑完MyLib.podspec文件后，需要验证一下这个MyLib.podspec文件是否可用

在Terminal中执行cd进入MyLib项目根目录然后，执行以下命令：

	$ pod lib lint
当你看到 Terminal 中输出：

	 -> MyLib (0.1.0)

	MyLib passed validation.
表示这个MyLib.podspec 验证通过，是一个符合CocoaPods规则的配置文件。

3.本地测试MyLib.podspec文件 
打开Example工程目录Podfile文件修改下pod 的引用

	  #pod 'MyLib', :path => '../' # 指定路径
	  pod 'MyLib', :podspec => '../MyLib.podspec'  # 指定podspec文件
然后在Example工程目录下执行pod update命令安装依赖，打开项目工程，现在可以看到库文件都被加载到Pods子项目中了

4.向Spec Repo提交podspec 
测试库文件没有问题我们就把MyLib.podspec提交到远程Spec Repo仓库中，就是本文开头说的Git仓库1
在Terminal中执行 cd进入MyLib项目根目录然后，执行以下命令：

	# pod repo push [Repo名] [podspec 文件名字]
	$ pod repo push MySpecs MyLib.podspec  
如果提交成功，在Terminal会输出：

	Validating spec
	 -> MyLib (0.1.0)
	
	Updating the `MySpecs' repo
	
	Already up-to-date.
	
	Adding the spec to the `MySpecs' repo
	
	 - [No change] MyLib (0.1.0)
	
	Pushing the `MySpecs' repo
	
	Username for 'https://git.coding.net': kensla
	Password for 'https://kensla@git.coding.net': 
	To https://git.coding.net/kensla/MySpecs.git
	   59b080c..b44123d  master -> master
表示提交成功了！这个组件库就添加到我们的私有Spec Repo中了，可以进入到~/.cocoapods/repos/MySpecs目录下查看

	.
	├── MyLib
	│   └── 0.1.0
	│       └── MyLib.podspec
	└── README.md
再去看我们的Spec Repo远端仓库 也就是Git仓库1，也有了一次提交，这个podspec也已经被Push上去了。

至此，我们的这个组件库就已经制作添加完成了，使用pod search命令就可以查到我们自己的库了.
在Terminal中执行 pod search MyLib
	
	-> MyLib (0.1.0)
	这个是我的私有库项目Demo.
	pod 'MyLib', '~> 0.1.0'
	- Homepage: https://coding.net/u/kensla
	- Source:   https://git.coding.net/kensla/MyLib.git
	- Versions: 0.1.0 [MySpecs repo]
四、使用制作好的Pod

在完成这一系列步骤之后，我们就可以在正式项目中使用这个私有的Pod了只需要在项目的Podfile里增加以下一行代码即可,
在正式项目的Podfile 里添加私有Spec Repo

	#私有Spec Repo
	source 'https://git.coding.net/kensla/DDSpecs.git' 
	pod 'MyLib', '~> 0.1.0'
然后执行pod update，更新库依赖，然后打开项目可以看到，我们自己的库文件已经出现在Pods子项目中的Pods子目录下了，而不再是Development Pods。

