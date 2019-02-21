# 自动打包命令


## 命令行打包（xcodebuild）

1）新建 Xcode 工程，进入工程的目录结构

``` swift
cd /Users/panzhijun/Desktop/BuildTest 
```
2）清除编译过程生成的文件；出现 ** CLEAN SUCCEEDED ** 则清除成功。

``` swift
xcodebuild clean -project BuildTest.xcodeproj -scheme BuildTest -configuration Debug

```
::: tip
-project/-workspace  后接项目名称 / 工作空间名称

-scheme              scheme名称

-configuration       Debug / Release

:::

运行效果：
``` swift

bogon:BuildTest panzhijun$ xcodebuild clean -project BuildTest.xcodeproj -scheme BuildTest -configuration Debug
2019-02-21 11:09:29.951 xcodebuild[53554:8550181] [MT] PluginLoading: Required plug-in compatibility UUID D7881182-AD00-4C36-A94D-F45FC9B0CF85 for plug-in at path '~/Library/Application Support/Developer/Shared/Xcode/Plug-ins/VVDocumenter-Xcode.xcplugin' not present in DVTPlugInCompatibilityUUIDs
note: Using new build system

** CLEAN SUCCEEDED **
```


3）使用 archive 命令生成 .xcarchive 文件;执行完后目录下多了 BuildTest.xcarchive 文件。

xcodebuild archive -project BuildTest.xcodeproj -scheme BuildTest -archivePath ./BuildTest.xcarchive

运行效果：

``` swift


bogon:BuildTest panzhijun$ xcodebuild archive -project BuildTest.xcodeproj -scheme BuildTest -archivePath ./BuildTest.xcarchive
2019-02-21 11:10:44.581 xcodebuild[53589:8555629] [MT] PluginLoading: Required plug-in compatibility UUID D7881182-AD00-4C36-A94D-F45FC9B0CF85 for plug-in at path '~/Library/Application Support/Developer/Shared/Xcode/Plug-ins/VVDocumenter-Xcode.xcplugin' not present in DVTPlugInCompatibilityUUIDs
User defaults from command line:
    IDEArchivePathOverride = /Users/panzhijun/Desktop/BuildTest/BuildTest.xcarchive

note: Using new build system
note: Planning build
note: Constructing build description
CreateBuildDirectory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    builtin-create-build-directory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath

CreateBuildDirectory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    builtin-create-build-directory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath

CreateBuildDirectory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    builtin-create-build-directory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation

SymLink /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/BuildTest.app /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /bin/ln -sfh /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/BuildTest.app

MkDir /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /bin/mkdir -p /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app

ProcessProductPackaging /Users/panzhijun/Library/MobileDevice/Provisioning\ Profiles/f262e741-9727-4bc5-9620-e75ddf621755.mobileprovision /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/embedded.mobileprovision (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    builtin-productPackagingUtility /Users/panzhijun/Library/MobileDevice/Provisioning\ Profiles/f262e741-9727-4bc5-9620-e75ddf621755.mobileprovision -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/embedded.mobileprovision

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources/Entitlements.plist (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources/Entitlements.plist

ProcessProductPackaging "" /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest.app.xcent (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    

Entitlements:

{
    "application-identifier" = "KXXXXXX486.com.xxxx.xxxxxxxx";
    "com.apple.developer.team-identifier" = KXXXXX486;
    "get-task-allow" = 1;
    "keychain-access-groups" =     (
        "KXXXXXX486.com.xxxx.xxxxxxxx"
    );
}


    builtin-productPackagingUtility -entitlements -format xml -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest.app.xcent

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/all-product-headers.yaml (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/all-product-headers.yaml

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-project-headers.hmap (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-project-headers.hmap

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest.hmap (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest.hmap

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-own-target-headers.hmap (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-own-target-headers.hmap

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-generated-files.hmap (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-generated-files.hmap

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-target-headers.hmap (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-target-headers.hmap

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-non-framework-target-headers.hmap (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-non-framework-target-headers.hmap

CompileC /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/AppDelegate.o /Users/panzhijun/Desktop/BuildTest/BuildTest/AppDelegate.m normal arm64 objective-c com.apple.compilers.llvm.clang.1_0.compiler (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export LANG=en_US.US-ASCII
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -x objective-c -arch arm64 -fmessage-length=123 -fdiagnostics-show-note-include-stack -fmacro-backtrace-limit=0 -fcolor-diagnostics -std=gnu11 -fobjc-arc -fobjc-weak -fmodules -gmodules -fmodules-cache-path=/Users/panzhijun/Library/Developer/Xcode/DerivedData/ModuleCache.noindex -fmodules-prune-interval=86400 -fmodules-prune-after=345600 -fbuild-session-file=/Users/panzhijun/Library/Developer/Xcode/DerivedData/ModuleCache.noindex/Session.modulevalidation -fmodules-validate-once-per-build-session -Wnon-modular-include-in-framework-module -Werror=non-modular-include-in-framework-module -Wno-trigraphs -fpascal-strings -Os -fno-common -Wno-missing-field-initializers -Wno-missing-prototypes -Werror=return-type -Wdocumentation -Wunreachable-code -Wno-implicit-atomic-properties -Werror=deprecated-objc-isa-usage -Wno-objc-interface-ivars -Werror=objc-root-class -Wno-arc-repeated-use-of-weak -Wimplicit-retain-self -Wduplicate-method-match -Wno-missing-braces -Wparentheses -Wswitch -Wunused-function -Wno-unused-label -Wno-unused-parameter -Wunused-variable -Wunused-value -Wempty-body -Wuninitialized -Wconditional-uninitialized -Wno-unknown-pragmas -Wno-shadow -Wno-four-char-constants -Wno-conversion -Wconstant-conversion -Wint-conversion -Wbool-conversion -Wenum-conversion -Wno-float-conversion -Wnon-literal-null-conversion -Wobjc-literal-conversion -Wshorten-64-to-32 -Wpointer-sign -Wno-newline-eof -Wno-selector -Wno-strict-selector-match -Wundeclared-selector -Wdeprecated-implementations -DNS_BLOCK_ASSERTIONS=1 -DOBJC_OLD_DISPATCH_PROTOTYPES=0 -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.1.sdk -fstrict-aliasing -Wprotocol -Wdeprecated-declarations -miphoneos-version-min=12.1 -g -fvisibility=hidden -Wno-sign-conversion -Winfinite-recursion -Wcomma -Wblock-capture-autoreleasing -Wstrict-prototypes -Wno-semicolon-before-method-body -Wunguarded-availability -fembed-bitcode -iquote /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-generated-files.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-own-target-headers.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-target-headers.hmap -iquote /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-project-headers.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/include -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources/arm64 -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources -F/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos -MMD -MT dependencies -MF /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/AppDelegate.d --serialize-diagnostics /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/AppDelegate.dia -c /Users/panzhijun/Desktop/BuildTest/BuildTest/AppDelegate.m -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/AppDelegate.o

CompileC /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/ViewController.o /Users/panzhijun/Desktop/BuildTest/BuildTest/ViewController.m normal arm64 objective-c com.apple.compilers.llvm.clang.1_0.compiler (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export LANG=en_US.US-ASCII
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -x objective-c -arch arm64 -fmessage-length=123 -fdiagnostics-show-note-include-stack -fmacro-backtrace-limit=0 -fcolor-diagnostics -std=gnu11 -fobjc-arc -fobjc-weak -fmodules -gmodules -fmodules-cache-path=/Users/panzhijun/Library/Developer/Xcode/DerivedData/ModuleCache.noindex -fmodules-prune-interval=86400 -fmodules-prune-after=345600 -fbuild-session-file=/Users/panzhijun/Library/Developer/Xcode/DerivedData/ModuleCache.noindex/Session.modulevalidation -fmodules-validate-once-per-build-session -Wnon-modular-include-in-framework-module -Werror=non-modular-include-in-framework-module -Wno-trigraphs -fpascal-strings -Os -fno-common -Wno-missing-field-initializers -Wno-missing-prototypes -Werror=return-type -Wdocumentation -Wunreachable-code -Wno-implicit-atomic-properties -Werror=deprecated-objc-isa-usage -Wno-objc-interface-ivars -Werror=objc-root-class -Wno-arc-repeated-use-of-weak -Wimplicit-retain-self -Wduplicate-method-match -Wno-missing-braces -Wparentheses -Wswitch -Wunused-function -Wno-unused-label -Wno-unused-parameter -Wunused-variable -Wunused-value -Wempty-body -Wuninitialized -Wconditional-uninitialized -Wno-unknown-pragmas -Wno-shadow -Wno-four-char-constants -Wno-conversion -Wconstant-conversion -Wint-conversion -Wbool-conversion -Wenum-conversion -Wno-float-conversion -Wnon-literal-null-conversion -Wobjc-literal-conversion -Wshorten-64-to-32 -Wpointer-sign -Wno-newline-eof -Wno-selector -Wno-strict-selector-match -Wundeclared-selector -Wdeprecated-implementations -DNS_BLOCK_ASSERTIONS=1 -DOBJC_OLD_DISPATCH_PROTOTYPES=0 -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.1.sdk -fstrict-aliasing -Wprotocol -Wdeprecated-declarations -miphoneos-version-min=12.1 -g -fvisibility=hidden -Wno-sign-conversion -Winfinite-recursion -Wcomma -Wblock-capture-autoreleasing -Wstrict-prototypes -Wno-semicolon-before-method-body -Wunguarded-availability -fembed-bitcode -iquote /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-generated-files.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-own-target-headers.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-target-headers.hmap -iquote /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-project-headers.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/include -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources/arm64 -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources -F/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos -MMD -MT dependencies -MF /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/ViewController.d --serialize-diagnostics /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/ViewController.dia -c /Users/panzhijun/Desktop/BuildTest/BuildTest/ViewController.m -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/ViewController.o

CompileC /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/main.o /Users/panzhijun/Desktop/BuildTest/BuildTest/main.m normal arm64 objective-c com.apple.compilers.llvm.clang.1_0.compiler (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export LANG=en_US.US-ASCII
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -x objective-c -arch arm64 -fmessage-length=123 -fdiagnostics-show-note-include-stack -fmacro-backtrace-limit=0 -fcolor-diagnostics -std=gnu11 -fobjc-arc -fobjc-weak -fmodules -gmodules -fmodules-cache-path=/Users/panzhijun/Library/Developer/Xcode/DerivedData/ModuleCache.noindex -fmodules-prune-interval=86400 -fmodules-prune-after=345600 -fbuild-session-file=/Users/panzhijun/Library/Developer/Xcode/DerivedData/ModuleCache.noindex/Session.modulevalidation -fmodules-validate-once-per-build-session -Wnon-modular-include-in-framework-module -Werror=non-modular-include-in-framework-module -Wno-trigraphs -fpascal-strings -Os -fno-common -Wno-missing-field-initializers -Wno-missing-prototypes -Werror=return-type -Wdocumentation -Wunreachable-code -Wno-implicit-atomic-properties -Werror=deprecated-objc-isa-usage -Wno-objc-interface-ivars -Werror=objc-root-class -Wno-arc-repeated-use-of-weak -Wimplicit-retain-self -Wduplicate-method-match -Wno-missing-braces -Wparentheses -Wswitch -Wunused-function -Wno-unused-label -Wno-unused-parameter -Wunused-variable -Wunused-value -Wempty-body -Wuninitialized -Wconditional-uninitialized -Wno-unknown-pragmas -Wno-shadow -Wno-four-char-constants -Wno-conversion -Wconstant-conversion -Wint-conversion -Wbool-conversion -Wenum-conversion -Wno-float-conversion -Wnon-literal-null-conversion -Wobjc-literal-conversion -Wshorten-64-to-32 -Wpointer-sign -Wno-newline-eof -Wno-selector -Wno-strict-selector-match -Wundeclared-selector -Wdeprecated-implementations -DNS_BLOCK_ASSERTIONS=1 -DOBJC_OLD_DISPATCH_PROTOTYPES=0 -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.1.sdk -fstrict-aliasing -Wprotocol -Wdeprecated-declarations -miphoneos-version-min=12.1 -g -fvisibility=hidden -Wno-sign-conversion -Winfinite-recursion -Wcomma -Wblock-capture-autoreleasing -Wstrict-prototypes -Wno-semicolon-before-method-body -Wunguarded-availability -fembed-bitcode -iquote /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-generated-files.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-own-target-headers.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-all-target-headers.hmap -iquote /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest-project-headers.hmap -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/include -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources/arm64 -I/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/DerivedSources -F/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos -MMD -MT dependencies -MF /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/main.d --serialize-diagnostics /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/main.dia -c /Users/panzhijun/Desktop/BuildTest/BuildTest/main.m -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/main.o

WriteAuxiliaryFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/BuildTest.LinkFileList (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    write-file /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/BuildTest.LinkFileList

Ld /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/BuildTest normal arm64 (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export IPHONEOS_DEPLOYMENT_TARGET=12.1
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/clang -arch arm64 -isysroot /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS12.1.sdk -L/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos -F/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos -filelist /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/BuildTest.LinkFileList -Xlinker -rpath -Xlinker @executable_path/Frameworks -miphoneos-version-min=12.1 -dead_strip -Xlinker -object_path_lto -Xlinker /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/BuildTest_lto.o -fembed-bitcode -Xlinker -bitcode_verify -Xlinker -bitcode_hide_symbols -Xlinker -bitcode_symbol_map -Xlinker /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos -Xlinker -final_output -Xlinker /Applications/BuildTest.app/BuildTest -fobjc-arc -fobjc-link-runtime -Xlinker -dependency_info -Xlinker /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Objects-normal/arm64/BuildTest_dependency_info.dat -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/BuildTest

CompileAssetCatalog /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app /Users/panzhijun/Desktop/BuildTest/BuildTest/Assets.xcassets (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /Applications/Xcode.app/Contents/Developer/usr/bin/actool --output-format human-readable-text --notices --warnings --export-dependency-info /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/assetcatalog_dependencies --output-partial-info-plist /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/assetcatalog_generated_info.plist --app-icon AppIcon --compress-pngs --enable-on-demand-resources YES --sticker-pack-identifier-prefix com.xxxx.xxxxxx.sticker-pack. --target-device iphone --target-device ipad --minimum-deployment-target 12.1 --platform iphoneos --product-type com.apple.product-type.application --compile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app /Users/panzhijun/Desktop/BuildTest/BuildTest/Assets.xcassets
/* com.apple.actool.compilation-results */
/Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/assetcatalog_generated_info.plist


CompileStoryboard /Users/panzhijun/Desktop/BuildTest/BuildTest/Base.lproj/Main.storyboard (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export XCODE_DEVELOPER_USR_PATH=/Applications/Xcode.app/Contents/Developer/usr/bin/..
    /Applications/Xcode.app/Contents/Developer/usr/bin/ibtool --errors --warnings --notices --module BuildTest --output-partial-info-plist /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj/Main-SBPartialInfo.plist --auto-activate-custom-fonts --target-device iphone --target-device ipad --minimum-deployment-target 12.1 --output-format human-readable-text --compilation-directory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj /Users/panzhijun/Desktop/BuildTest/BuildTest/Base.lproj/Main.storyboard

CompileStoryboard /Users/panzhijun/Desktop/BuildTest/BuildTest/Base.lproj/LaunchScreen.storyboard (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export XCODE_DEVELOPER_USR_PATH=/Applications/Xcode.app/Contents/Developer/usr/bin/..
    /Applications/Xcode.app/Contents/Developer/usr/bin/ibtool --errors --warnings --notices --module BuildTest --output-partial-info-plist /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj/LaunchScreen-SBPartialInfo.plist --auto-activate-custom-fonts --target-device iphone --target-device ipad --minimum-deployment-target 12.1 --output-format human-readable-text --compilation-directory /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj /Users/panzhijun/Desktop/BuildTest/BuildTest/Base.lproj/LaunchScreen.storyboard

ProcessInfoPlistFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/Info.plist /Users/panzhijun/Desktop/BuildTest/BuildTest/Info.plist (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    builtin-infoPlistUtility /Users/panzhijun/Desktop/BuildTest/BuildTest/Info.plist -genpkginfo /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/PkgInfo -expandbuildsettings -format binary -platform iphoneos -additionalcontentfile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj/LaunchScreen-SBPartialInfo.plist -additionalcontentfile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj/Main-SBPartialInfo.plist -additionalcontentfile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/assetcatalog_generated_info.plist -requiredArchitecture arm64 -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/Info.plist

LinkStoryboards (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export XCODE_DEVELOPER_USR_PATH=/Applications/Xcode.app/Contents/Developer/usr/bin/..
    /Applications/Xcode.app/Contents/Developer/usr/bin/ibtool --errors --warnings --notices --module BuildTest --target-device iphone --target-device ipad --minimum-deployment-target 12.1 --output-format human-readable-text --link /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj/LaunchScreen.storyboardc /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/Base.lproj/Main.storyboardc

GenerateDSYMFile /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/BuildTest.app.dSYM /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/BuildTest (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/dsymutil /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/BuildTest -o /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/BuildProductsPath/Release-iphoneos/BuildTest.app.dSYM

Strip /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/BuildTest (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/strip /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app/BuildTest

SetOwnerAndGroup panzhijun:staff /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /usr/sbin/chown -RH panzhijun:staff /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app

SetMode u+w,go-w,a+rX /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /bin/chmod -RH u+w,go-w,a+rX /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app

CodeSign /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    export CODESIGN_ALLOCATE=/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/codesign_allocate
    
Signing Identity:     "iPhone Developer: xxxx (xxxxxxx)"
Provisioning Profile: "Dev_XX_XXXXXX"
                      (xxxxxxxx-xxxxx-xxxxx-9620-xxxxxxxx)

    /usr/bin/codesign --force --sign 8A8D5FB828E0F14DB2BEC42EB7C5A6F44DF98D96 --entitlements /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/IntermediateBuildFilesPath/BuildTest.build/Release-iphoneos/BuildTest.build/BuildTest.app.xcent --timestamp=none /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app

Validate /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    builtin-validationUtility /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app

Touch /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app (in target: BuildTest)
    cd /Users/panzhijun/Desktop/BuildTest
    /usr/bin/touch -c /Users/panzhijun/Library/Developer/Xcode/DerivedData/BuildTest-dooqfbodjhbgtsdnlsqpfhisxnxu/Build/Intermediates.noindex/ArchiveIntermediates/BuildTest/InstallationBuildProductsLocation/Applications/BuildTest.app

** ARCHIVE SUCCEEDED **
```

4）配置归档导出用的plist文件,需指定以下信息（放在工程目录下）

``` swift

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>provisioningProfiles</key>
	<dict>
		<key>com.xxxx.xxxxxxxx</key>
		<string>Dev_XX_XXXXXXXX</string>
	</dict>
	<key>method</key>
	<string>development</string>
	<key>compileBitcode</key>
	<false/>
	<key>signingCertificate</key>
	<string>8A8XXXXXXXXXXXXXXXXXXXX98D96</string>
	<key>teamID</key>
	<string>KXXXXXX486</string>
</dict>
</plist>

```

::: tip
获取signingCertificate： 在证书右键点击->显示简介，拉到最下面获取-> SHA-1的数据。

com.xxxx.xxxxxxxx: Bundle Identifier

Dev_XX_XXXXXXXX : xcode中-> General -> singing(Dubug)下-> Provisioning Profile 显示的名字。

KXXXXXX486： Team 显示的名字。
:::


5）利用 -exportArchive 指令导出 ipa 包

``` swift
xcodebuild -exportArchive -exportOptionsPlist Export.plist -archivePath ./BuildTest.xcarchive -exportPath ./autoPackage -allowProvisioningUpdates
```

运行结果：

``` swift

bogon:BuildTest panzhijun$ xcodebuild -exportArchive -exportOptionsPlist Export.plist -archivePath ./BuildTest.xcarchive -exportPath ./autoPackage -allowProvisioningUpdates
2019-02-21 11:37:29.941 xcodebuild[54453:8668174] [MT] PluginLoading: Required plug-in compatibility UUID D7881182-AD00-4C36-A94D-F45FC9B0CF85 for plug-in at path '~/Library/Application Support/Developer/Shared/Xcode/Plug-ins/VVDocumenter-Xcode.xcplugin' not present in DVTPlugInCompatibilityUUIDs
2019-02-21 11:37:30.080 xcodebuild[54453:8668174] [MT] IDEDistribution: -[IDEDistributionLogging _createLoggingBundleAtPath:]: Created bundle at path '/var/folders/5d/440tqk1s7sn312s23tc6x_9r0000gn/T/BuildTest_2019-02-21_11-37-30.079.xcdistributionlogs'.
Exported BuildTest to: /Users/panzhijun/Desktop/BuildTest/autoPackage
** EXPORT SUCCEEDED **


```

6）查看生成的路径下是否有 ipa 包