## Fect UI - Vue 贡献指南

### 准备开始

我们欢迎任何人参与这个项目的建设。

再开始之前，您需要知道什么是 Vue-next 并且对 Vue-next 有一个初步的认识，如果您不了解 Vue-next 那么这里有一份很好的[学习 Vue-next 的文档](https://v3.cn.vuejs.org/)。

如果您不知道 Git 及 Git 的基本操作，可以参考 [GitHub 帮助文档](https://help.github.com/zh/github/using-git)。

1. [Fork 这个仓库](https://help.github.com/zh/github/getting-started-with-github/fork-a-repo)到您自己的账号下，然后将它 clone 到本地。
2. 为您的改动创建一个新的分支: `git checkout -b {BRANCH_NAME}`。
3. 安装一个包管理工具 [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
   然后更新项目的依赖: `yarn`
4. 依次执行以下命令:
   - `yarn cli`
   - `yarn clean`
   - `yarn`
   - `yarn hooks`
   - `yarn icon`
   - `yarn dev`
5. 在本地页面中查看你的更改。

在任何您认为合适的时间，您都可以按照以下步骤提交您优秀的作品:

1. 运行 `yarn lint` 检查代码风格。
2. 运行 `yarn test` 更新并运行您的测试用例。
3. 运行 `git commit -m '{YOUR_MESSAGE}'` 提交您的更改。 提交信息的格式应该符合[规范](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md).
4. Push 代码到您的仓库并且 在 GitHub 上[创建一个 PullRequest](https://help.github.com/zh/github/collaborating-with-issues-and-pull-requests/about-pull-requests) 。

### 常用步骤

#### **创建组件**

1. 在 `packages` 中创建一个组件目录。
2. 运行 `yarn collect` 命令，它会自动添加一条 `import` 到 `packages/index.ts` 中。
3. 在 `docs/zh-cn` 和 `docs/example` 中创建该组件的文档文件，它将会被自动注册。
4. 重启本地服务查看更改: `yarn dev`。

#### **创建测试用例**

1. 本仓库使用 jest 进行单元测试，所以您不需要额外引入其他的单元测试库。
2. 如果您创建并完成了一个组件，那么测试用例是必不可少的。
3. 如果您只是修改了组件，请注意更新 **测试快照**: `yarn test -u`.
4. 提交前请在本地检查测试的覆盖率。

### Q & A

> 如何更新到远程仓库 ?

- 参考[这里](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8).

> 如何选择 PR 的目标分支 ?

- 如果这是一个 feature, 请设置为 `main` 分支。其他的都设置为 `rc` 分支。

### 遇到困难了

- 创建新的 issue 告诉我们: [创建 issue](https://github.com/fect-org/fect/issues)。
