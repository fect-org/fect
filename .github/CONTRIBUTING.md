## Fect UI - Vue Contributing Guide

### Ready to start

We welcome everyone to join the construction of the project.
As a pre requirement,you need to know what is Vue-next and have a preliminary understanding of Vue-next,if you don't know Vue-next
this is a good [learn document for Vue-next](https://v3.vuejs.org/).
If you don't know Git,basic operation of Git,you can refer to [GitHub's help documentation](https://help.github.com/en/github/using-git).

1. [Fork this repository](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) to your own account and then clone it.
2. Create a new branch for your changes: `git checkout -b {BRANCH_NAME}`.
3. Install a package management tools [Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable)
   and then update project dependenices `Yarn`
4. Run these commands in order:
   - `yarn cli`
   - `yarn clean`
   - `yarn`
   - `yarn hooks`
   - `yarn icon`
   - `yarn dev`
5. View your changes on your local document site.

At any time, you think it's ok, you can start the following steps to submit your amazing works:

1. Run `yarn lint` check the code style.
2. Run `yarn test` to update & run your testcase.
3. Run `git commit -m '{YOUR_MESSAGE}'` to commit changes. Commit info should be formatted by the [rules](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md).
4. Push code to your own repo and [create PullRequest](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) at GitHub.

### Common steps

#### **Create component**

1. Create a component folder in `packages`.
2. Run `Yarn collect` and it will automatic add `import` to `packages/index.ts`
3. Create a document file in `docs/zh-cn` and `docs/example`,it will automatic logon.
4. Restart local server view changes: `yarn dev`.

#### **Create testcase**

1. This repository is using jest as unit test, So you don't need to introduce extra unit test lib.
2. If you are creating a new component,and complete it,the testcase is required.
3. If you only modify components,please note update **test snapshot**: `yarn test -u`.
4. Please check coverage locally before submit.

### Q & A

> How can I update remote origin ?

- refer to [here](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes).

> How to choose the target banch of PR ?

- If this is a feature, set to `main` branch. All the others are set to `rc` branch.

### Get stuck

- Create new issue to tell us: [create issue](https://github.com/fay-org/fect/issues).
