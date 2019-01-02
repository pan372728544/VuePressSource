# pod

① 在 git 上创建一个组件库
② git clone git@gitlab.ds.gome.com.cn:mobile-iphone-app/{***.git}
④ -> ③ git add . ; git commit -m "xxxxx"
③ -> ⑤ git push origin(本地分支) master(远程分支)
⑥  git tag -a 0.1.0 -m "version 0.1.0"
⑥ -> ⑦ git push origin --tags
⑧ pod lib lint
⑧ -> ⑨ pod repo push com-mobile-iphone-app-gomerepo {pod名称}.podspec

验证 spec 文件

在 spec 的文件目录下，执行验证命令，直到 pass 为止。

完整实例

pod lib lint --verbose --sources="https://gitlab.ds.gome.com.cn/mobile-iphone-app/GomeRepo.git","https://github.com/CocoaPods/Specs.git" --allow-warnings

实际调用了 xcodebuild 命令

有用的命令选项

--allow-warnings                                  允许警告存在
--subspec=NAME                                    只验证指定的 子spec
--fail-fast                                       第一次失败就停止 libraries 库
--use-libraries                                   验证时，pod自动加载系统 
--sources=https://github.com/artsy/Specs,master   指定私有 spec 库
--verbose                                         显示编译详细日志
--help                                            查看帮助




上传 spec 文件

通过 cocoapods 的提交命令，可以将 spec 文件提交到本地的 spec 仓库并同时提交到远程私有的 spec 仓库。

cocoaspods 通过 podfile 中的库名称，便能找到对应的 spec 文件。

然后通过 spec 中的 source 节点找到对应的源文件 git 仓库。

pod repo push com-mobile-iphone-app-gomerepo {pod名称}.podspec --allow-warnings --use-libraries

com-mobile-iphone-app-gomerepo 是 cocoapods 默认规则的名字，都是用这个名字即可
有用的命令选项

--allow-warnings                                  允许警告存在
--use-libraries                                   验证时，pod自动加载系统 
--sources=https://github.com/artsy/Specs,master   依赖的其它源
--local-only                                      只推送到本地，不推送到远程
--commit-message="Fix bug in pod"                 注释
--use-json                                        源中使用 JSON 格式保存
--verbose                                         显示详细信息
--help                                            帮助