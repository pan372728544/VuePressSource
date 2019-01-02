# Jenkins 在MAC上的配置使用

因为网上教程多是依靠Github，而且很多是在Jenkins中配置Xcode参数，相当的麻烦，我们是用Shell 脚本，非常的easy。在这里记录下环境搭建的过程，希望能帮他人减少一点坑。

## 安装Jenkins 
Jenkins是基于Java开发的一种持续集成工具。所以呢，要使用Jenkins必须使用先安装JDK。

### JDK安装 
JDK [下载地址](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
![](/img/jen/1.png)
安装JDK的过程略，别说你不会安装（如有不会安装的，自行百度）。

### Jenkins安装 
Jenkins [下载地址](http://jenkins-ci.org/)

安装过程如下：

![](/img/jen/2.png)
![](/img/jen/3.png)
![](/img/jen/4.png)
![](/img/jen/5.png)
![](/img/jen/6.png)
![](/img/jen/7.png)
也可以下载jenkins.war, 然后运行Java -jar jenkins.war，进行安装。

安装完成之后，Safari可能会自动打开，如果没有自动打开，打开浏览器，输入http://localhost:8080
![](/img/jen/8.png)
这个时候可能会报一个错误。如果出现了上面的问题，原因可能是Java环境有问题，重新安装JDK环境即可。

正常的话，应该会看到下面这个重设初始密码的界面 
![](/img/jen/9.png)

	注意： 
	1、Jenkins 安装成功后,会创建一个Jenkins用户，而Jenkins的工作区间默认是在【/用户/共享/Jenkins/Home/jobs】目录下，可以用Finder–>前往，进入。 
	2、Jenkins目录下的文件夹的读写权限只对Jenkins用户开放，所以后面apple证书等必须在Jenkins用户下安装，项目的ipa导出也得在Jenkins用户下操作。（或者用管理员权限修改该目录针对用户的权限) 
	3、Jenkins的使用是每一个用户都可以使用，所以有可能导致构建版本的时候报错，还是老老实实在Jenkins用户下操作吧。
## 设置Jenkins用户 
### 进入 系统偏好设置->用户与群组 
### 点击左下角的解锁，输入当前用户的密码 
### 此时Jenkins用户还是一个空的无名用户，可以在用户列表中选择Jenkins用户，右击并选择“高级选项”，输入全名并确定。
### 点击“更改密码”重设Jenkins用户的密码。为了后期方便，可勾选“运行用户管理这台电脑”，将Jenkins用户设为管理员。 
### 选择用户列表下方的登录选项，将自动登录用户设为Jenkins。

## 初始化Jenkins 
重启以后，自动以Jenkins登录了。找到/Users/Shared/Jenkins/Home/ 这个目录下，打开initialAdminPassword文件，复制出密码，就可以填到网页上去重置密码了。如下图 

![](/img/jen/10.png)

![](/img/jen/11.png)
![](/img/jen/12.png)
![](/img/jen/13.png)
![](/img/jen/14.png)
一路安装过来，输入用户名，密码，邮件这些，就算安装完成了。

## 安装插件 
正常情况下，常用的插件都已经安装了，如果有插件安装失败或者需要特殊的插件，可以自行安装。
![](/img/jen/15.png)
![](/img/jen/16.png)
![](/img/jen/17.png)
![](/img/jen/18.png)
## Xcode以及开发证书设置 
因为要使用Xcode命令，所以必须保证Xcode command Line已安装。

###设置apple development 证书 
在原来Xcode开发所在用户下，导出发布证书，然后拷贝到Jenkins用户环境下，双击安装到Mac 的钥匙串中。 
![](/img/jen/19.png)

	注意： 
	因为用户访问钥匙串中的证书需要权限，而用jenkins构建时，不管是用Xcode插件配置还是shell 脚本，都不能输入用户密码，所以必须设置证书的【访问控制】为允许所有应用程序访问此项目。
	
	### 安装mobileprovision描述文件 
同样需要在Jenkins用户下，安装好打包需要的手机描述文件。

## 配置构建项目 
下面讲解构建项目的配置，可以使用本地的项目，也可以使用SVN上的项目（只需要填入svn上工程地址即可），然后输入shell 脚本就可以开始构建了。

### 使用本地项目构建 
步骤如下： 
![](/img/jen/20.png)
点击OK，在【/用户/共享/Jenkins/Home/jobs】目录下会生成HelloJenkins的目录。 
![](/img/jen/21.png)
![](/img/jen/22.png)
其他的设置项，均不用设置，只需要设置下脚本即可，脚本详细的内容如下：


	# 工程名
	APP_NAME="HelloJenkins"
	# 证书
	CODE_SIGN_DISTRIBUTION="iPhone Distribution: XXXXXXXXXXXX"
	# info.plist路径
	project_infoplist_path="./${APP_NAME}/Info.plist"
	
	#取版本号
	bundleShortVersion=$(/usr/libexec/PlistBuddy -c "print CFBundleShortVersionString" "${project_infoplist_path}")
	
	#取build值
	bundleVersion=$(/usr/libexec/PlistBuddy -c "print CFBundleVersion" "${project_infoplist_path}")
	
	DATE="$(date +%Y%m%d)"
	IPANAME="${APP_NAME}_V${bundleShortVersion}_${DATE}.ipa"
	
	echo "=================clean================="
	xcodebuild -target "${APP_NAME}"  -configuration 'Release' clean
	
	echo "+++++++++++++++++build+++++++++++++++++"
	xcodebuild -target "${APP_NAME}" -sdk iphoneos -configuration 'Release' CODE_SIGN_IDENTITY="${CODE_SIGN_DISTRIBUTION}" SYMROOT='$(PWD)'
	
	xcrun -sdk iphoneos PackageApplication "./Release-iphoneos/${APP_NAME}.app" -o ~/"${IPANAME}"


	注意1：【-o ~/$IPANAME】表示导出的ipa文件在当前用户的目录下，即【/用户/共享/Jenkins/】下。 
	其中CODE_SIGN_IDENTITY=”iPhone Distribution: 
	xxxxxxxxxx”是你打包使用的证书在钥匙串中的常用名称。 
	导出的ipa，叫【HelloJenkins_V1.2_20160118.ipa】。
	注意2：如果如上图【配置项目第二步】那样，在xcodeproj相同目录下，新建一个sh脚本文件，用【sh 
	xxx.sh】命令的话，见6.3介绍。 如果你的项目中用到了cocoapods,那脚本有几个参数需要调整一下，详情见下文。
	注意3（2016.02.17更新）：CODE_SIGN_IDENTITY 
	这个属性可以不设置，直接设置profile就可以了，编译时会自动去匹配对应的CODE_SIGN_IDENTITY，需要注意的是设置profile时，设置的是其UUID值。例如【PROVISIONING_PROFILE=’f035763e-e847-4db8-ac10-0004809fdc90’】
	
点击保存，然后点击左侧菜单，立即构建，即可开始构建。 

![](/img/jen/23.png)
### 使用svn地址构建 
第一步，新建项目，与上面的一样。 
第二步，不用将工程拷贝到jobs目录下了，直接在配置里源码管理那一栏设置svn地址 

![](/img/jen/24.png)
第三步，设置shell 脚本，与上面的一样。 
第四步，立即构建即可。

### 如何使用【sh jenkins.sh】 
将打包脚本写在jenkins.sh文件中，并将此文件放在project根目录，Jenkins中按下图修改。
![](/img/jen/25.png)
### 使用cocoapods的项目脚本如何改 
使用cocoapods后，因为启动项目的工程文件已经由【xxx.xcodeproj】变为【xxx.xcworkspace】,所以在build时，需要添加【-workspace】和【-scheme】，同时去掉【-target】,如果不修改这些参数，构建会报错也会提示设置这些项。
	
	# 工程名
	APP_NAME="HelloJenkins"
	# 证书
	CODE_SIGN_DISTRIBUTION="iPhone Distribution: SunEee Weilian Technology Development Co., Ltd."
	# info.plist路径
	project_infoplist_path="./${APP_NAME}/Info.plist"
	
	#取版本号
	bundleShortVersion=$(/usr/libexec/PlistBuddy -c "print CFBundleShortVersionString" "${project_infoplist_path}")
	
	#取build值
	bundleVersion=$(/usr/libexec/PlistBuddy -c "print CFBundleVersion" "${project_infoplist_path}")
	
	DATE="$(date +%Y%m%d)"
	IPANAME="${APP_NAME}_V${bundleShortVersion}_${DATE}.ipa"
	
	#要上传的ipa文件路径
	IPA_PATH="$HOME/${IPANAME}"
	echo ${IPA_PATH}
	echo "${IPA_PATH}">> text.txt
	
	echo "=================clean================="
	xcodebuild -workspace "${APP_NAME}.xcworkspace" -scheme "${APP_NAME}"  -configuration 'Release' clean
	
	echo "+++++++++++++++++build+++++++++++++++++"
	xcodebuild -workspace "${APP_NAME}.xcworkspace" -scheme "${APP_NAME}" -sdk iphoneos -configuration 'Release' CODE_SIGN_IDENTITY="${CODE_SIGN_DISTRIBUTION}" SYMROOT='$(PWD)'
	
	xcrun -sdk iphoneos PackageApplication "./Release-iphoneos/${APP_NAME}.app" -o ~/"${IPANAME}"
	
### 添加构建后自动上传蒲公英的脚本 
![](/img/jen/26.png)
![](/img/jen/27.png)
upload.sh脚本与上面jenkins.sh脚本在同一目录。 
【upload.sh】内容如下：

	#蒲公英上的User Key
	uKey="9743f8cbe9ebef9863912a9d52ac19ce"
	#蒲公英上的API Key
	apiKey="0419615fa1ebbe8179ee9978abc3d753"
	#要上传的ipa文件路径
	IPA_PATH=$(cat text.txt)
	
	rm -rf text.txt
	
	#执行上传至蒲公英的命令
	echo "++++++++++++++upload+++++++++++++"
	curl -F "file=@${IPA_PATH}" -F "uKey=${uKey}" -F "_api_key=${apiKey}" http://www.pgyer.com/apiv1/app/upload
	
	注意：脚本中的uKey和apiKey，是自己的账户对应的userKey和apiKey。
	
上传成功后，会返回相应的json数据。失败提示，可以参考蒲公英官网说明。 	

![](/img/jen/28.png)

### 没有Scheme，导致无法打包 
有时候会遇到项目代码拉下来后，执行打包脚本会卡在xcodebuild命令下，通过xcodebuild -list命令查看：如图显示no schems. 
![](/img/jen/29.png)
原因是本机生成的scheme，在另一台Mac下不可用。又由于我们一般上传SVN或git的时候会把xcuserdata文件删除，这样就找不到scheme了，而用Xcode打开一次工程之后就可以成功执行了，也就是生成了xcuserdata文件。 
具体解决看图：将图上按钮全部勾选，然后xcworkspace中会生成xcshareddata文件，好，我们需要的正是该文件，注意将该文件附带工程中上传至SVN或git，那样在其他电脑上都可执行成功了！ 
![](/img/jen/30.png)

	注意：其实不需要将所有Scheme都共享，只需共享打包脚本会用到的Scheme即可。
### 命令行调用code sign时报错：User interaction is not allowed 
虽然5.1设置了证书所有应用可用，但是还是可能会遇到User interaction is not allowed，这是因为Jenkins使用的是一个独立的用户环境。解决方法是在你的打包脚本的签名前加上

	security unlock-keychain  -p "你的用户密码" ~/Library/Keychains/login.keychain
	1
构建成功之后，这句就可以删掉了，只需运行一次。 
如果还是出错，可以使用 
	security show-keychain-info ~/Library/Keychains/login.keychain 
查看一下具体情况，有可能提示 
	Keychain "/Users/Shared/Jenkins/Library/Keychains/login.keychain" lock-on-sleep timeout=300s， 
即只有5分钟有效。可以将时间设置长一点来解决 
	security set-keychain-settings -t 3600 -l ~/Library/Keychains/login.keychain

### Python 字符编码问题 
如果使用到了Python脚本，可能会遇到“UnicodeEncodeError: ‘ascii’ codec can’t encode characters ”的错误，可以在Python文件的开头加上
	
	import sys 
	reload(sys) 
	sys.setdefaultencoding('utf-8') 
	
	
参考文献： 
[Mac下Jenkins+SVN+Xcode构建持续导出环境](http://www.jianshu.com/p/c0955ff67c91)
[Mac下Jenkins构建+蒲公英分发](http://www.jianshu.com/p/45c3fbc6924a) 
[SETTING UP JENKINS CI ON A MAC](http://www.cimgf.com/2015/05/26/setting-up-jenkins-ci-on-a-mac-2/) 
[手把手教你利用Jenkins持续集成iOS项目](http://www.cocoachina.com/ios/20160804/17281.html) 
[基于xcodebuild和xcrun的自动化打包](http://blog.csdn.net/liqinghai2015/article/details/49469263) 
[Jenkins and Xcode: “User Interaction Is Not Allowed”](http://www.egeek.me/2013/02/23/jenkins-and-xcode-user-interaction-is-not-allowed/) 
[python UnicodeEncodeError: ‘ascii’ codec can’t encode characters 解决方法](http://www.iteye.com/topic/699510) 
[Python字符串的编码与解码(encode与decode)](http://www.cnblogs.com/linjiqin/p/3674825.html)	