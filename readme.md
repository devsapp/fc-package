# 函数计算代码打包上传拓展组件

通过该组件，可以快速实现代码的打包以及上传到对象存储相关的功能。

- [代码打包](#zip)
- [代码上传](#upload)

## zip

主要是进行代码打包相关操作，将项目代码打包成zip包。

命令的基本形式：`s cli fc-package zip --name demo.zip`

参数具体形式：

| 参数全称   | 参数缩写 | 必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| name       | -        | 选填           | 打包后的代码包名字，默认是`当前代码包的md5值.zip`                          |
| code | -        | 选填           | 代码所在位置，默认当前目录`./`                                        |
| runtime | -       | 选填           | 当前代码的运行时，默认`nodejs14`                                        |
| debug      | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 查看帮助信息                                                 |

## upload

主要是将指定的代码包上传到对象存储中。

命令的基本形式：`s cli fc-package upload --region cn-beijing --bucket others-file-system --zip tempName.zip`

参数具体形式：

| 参数全称   | 参数缩写 |必填 | 参数含义                                                     |
| ---------- | -------- | -------------- | ------------------------------------------------------------ |
| region       | -        | 选填           | 对象存储所在的地区（要与函数要部署的地区一致），默认是`cn-hangzhou`                           |
| bucket | -        | 必填           | 存储桶名称（需要时已经存在的，且在当前账号下的）                                     |
| object | -        | 选填           | 上传到对象存储中的文件对象，默认是`当前代码包的md5值.zip`                                        |
| zip | -        | 必填           | 当前压缩包地址                                     |
| access     | a        | 选填           | 本次请求使用的密钥，可以使用通过[config命令](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#config-add-命令) 配置的密钥信息，以及[配置到环境变量的密钥信息](https://github.com/Serverless-Devs/Serverless-Devs/tree/master/docs/zh/command/config.md#通过环境变量配置密钥信息) |
| debug      | -        | 选填           | 打开`debug`模式，将会输出更多日志信息                        |
| help       | h        | 选填           | 查看帮助信息                                                 |