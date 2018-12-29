#  Flutter  - 安装配置


## 获取Flutter SDK

去flutter官网下载其最新可用的安装包，[转到下载页](https://flutter.io/docs/development/tools/sdk/archive?tab=macos#macos) 。

注意，Flutter的渠道版本会不停变动，请以Flutter官网为准。另外，在中国大陆地区，要想正常获取安装包列表或下载安装包，可能需要翻墙，读者也可以去Flutter github项目下去下载安装包，[转到下载页](https://github.com/flutter/flutter/releases) 。

解压安装包到你想安装的目录，如：
``` js
cd ~/development
unzip ~/Downloads/flutter_macos_v1.0.0-stable.zip
```
## 使用镜像

如果你在国内使用 Flutter，那么你可能需要找一个与官方同步的可信的镜像站点，帮助你的 Flutter 命令行工具到该镜像站点下载其所需的资源。
你需要为此设置两个环境变量：“PUB_HOSTED_URL”和“FLUTTER_STORAGE_BASE_URL”，然后再运行 Flutter 命令行工具，查看设置教程。

**上海交通大学 Linux 用户组**
``` js
FLUTTER_STORAGE_BASE_URL: https://mirrors.sjtug.sjtu.edu.cn
PUB_HOSTED_URL: https://dart-pub.mirrors.sjtug.sjtu.edu.cn
```
**Flutter 社区**
``` js
FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
PUB_HOSTED_URL: https://pub.flutter-io.cn
```

这里使用下面的例子：

``` js
$ export PUB_HOSTED_URL=https://pub.flutter-io.cn
$ export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
$ git clone -b dev https://github.com/flutter/flutter.git
$ export PATH="$PWD/flutter/bin:$PATH"
$ cd ./flutter
$ flutter doctor

```

终端提示：

``` js
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.0.0, on Mac OS X 10.14 18A391, locale
    zh-Hans-CN)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from:
      https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK
      components.
      (or visit https://flutter.io/setup/#android-setup for detailed
      instructions).
      If Android SDK has been installed to a custom location, set $ANDROID_HOME
      to that location.
      You may also want to add it to your PATH environment variable.

[!] iOS toolchain - develop for iOS devices (Xcode 10.1)
    ✗ libimobiledevice and ideviceinstaller are not installed. To install with
      Brew, run:
        brew update
        brew install --HEAD usbmuxd
        brew link usbmuxd
        brew install --HEAD libimobiledevice
        brew install ideviceinstaller
    ✗ ios-deploy not installed. To install with Brew:
        brew install ios-deploy
[!] Android Studio (not installed)
[✓] Connected device (1 available)

! Doctor found issues in 3 categories.

```
按照提示安装 **libimobiledevice、ideviceinstaller 、ios-deploy**

一旦你安装了任何缺失的依赖，再次运行flutter doctor命令来验证你是否已经正确地设置了

``` js
$ flutter doctor

Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.0.0, on Mac OS X 10.14 18A391, locale zh-Hans-CN)
[✗] Android toolchain - develop for Android devices
    ✗ Unable to locate Android SDK.
      Install Android Studio from: https://developer.android.com/studio/index.html
      On first launch it will assist you in installing the Android SDK components.
      (or visit https://flutter.io/setup/#android-setup for detailed instructions).
      If Android SDK has been installed to a custom location, set $ANDROID_HOME to that location.
      You may also want to add it to your PATH environment variable.

[✓] iOS toolchain - develop for iOS devices (Xcode 10.1)
[!] Android Studio (not installed)
[✓] Connected device (2 available)

! Doctor found issues in 2 categories.
```

## 更新环境变量

添加路径

``` js
$  export PATH=~/development/flutter/bin:$PATH
```

刷新当前终端窗口.

``` js
$ source $HOME/.bash_profile
```

查看是否有flutter路径

``` js
$ echo $PATH
```

## 验证flutter是否可用
使用 flutter 命令行工具，您可以使用任何编辑器来开发Flutter应用程序。输入flutter help在提示符下查看可用的工具。

``` js
$ flutter -h
Manage your Flutter app development.

Common commands:

  flutter create <output directory>
    Create a new Flutter project in the specified directory.

  flutter run [options]
    Run your Flutter application on an attached device or in an emulator.

Usage: flutter <command> [arguments]

Global options:
-h, --help                  Print this usage information.
-v, --verbose               Noisy logging, including all shell commands executed.
                            If used with --help, shows hidden options.

-d, --device-id             Target device id or name (prefixes allowed).
    --version               Reports the version of this tool.
    --suppress-analytics    Suppress analytics reporting when this command runs.
    --bug-report            Captures a bug report file to submit to the Flutter team.
                            Contains local paths, device identifiers, and log snippets.

    --packages              Path to your ".packages" file.
                            (required, since the current directory does not contain a ".packages" file)

Available commands:
  analyze                  Analyze the project's Dart code.
  attach                   Attach to a running application.
  bash-completion          Output command line shell completion setup scripts.
  build                    Flutter build commands.
  channel                  List or switch flutter channels.
  clean                    Delete the build/ directory.
  config                   Configure Flutter settings.
  create                   Create a new Flutter project.
  devices                  List all connected devices.
  doctor                   Show information about the installed tooling.
  drive                    Runs Flutter Driver tests for the current project.
  emulators                List, launch and create emulators.
  format                   Format one or more dart files.
  help                     Display help information for flutter.
  install                  Install a Flutter app on an attached device.
  logs                     Show log output for running Flutter apps.
  make-host-app-editable   Moves host apps from generated directories to non-generated directories so that they can
                           be edited by developers.
  packages                 Commands for managing Flutter packages.
  precache                 Populates the Flutter tool's cache of binary artifacts.
  run                      Run your Flutter app on an attached device.
  screenshot               Take a screenshot from a connected device.
  stop                     Stop your Flutter app on an attached device.
  test                     Run Flutter unit tests for the current project.
  trace                    Start and stop tracing for a running Flutter app.
  upgrade                  Upgrade your copy of Flutter.

Run "flutter help <command>" for more information about a command.
Run "flutter help -v" for verbose help output, including less commonly used options.
```