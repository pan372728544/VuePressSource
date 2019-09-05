#  Flutter  - 版本更新

## 一、下载新版Flutter

1.   cd 到用户文件夹下，创建新的文件夹new，进行克隆下载。

```powershell
$ git clone -b master https://github.com/flutter/flutter.git
$ ./flutter/bin/flutter --version
```

 运行结果：

```powershell
Cloning into 'flutter'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 186351 (delta 0), reused 0 (delta 0), pack-reused 186348
Receiving objects: 100% (186351/186351), 69.85 MiB | 1.01 MiB/s, done.
Resolving deltas: 100% (142565/142565), done.

```

2. 修改环境变量

   打开用户目录下的 **.bash_profile** 添加如下内容：

   ```powershell
    export PATH=~/new/flutter/bin:$PATH
   ```

   运行  **source $HOME/.bash_profile** 刷新当前终端窗口

   查看fultter/bin 是否在环境变量目录中：

   ```powershell
   echo $PATH
   ```

   打印如下就说明在环境中了

   ```powershell
   /Users/userName/new/flutter/bin:
   ```

3. 运行命令更新下载新的sdk

   ```powershell
   $ flutter doctor
   ```

   ```shell
   Downloading Dart SDK from Flutter engine e7f9ef6aa0b9040102d1b3c9a6ae934df746ef94...
     % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
   ​                                 Dload  Upload   Total   Spent    Left  Speed
     6  267M    6 17.3M    0     0   234k      0  0:19:26  0:01:15  0:18:11  236k
   ```

   