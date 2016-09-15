# Contribute to T4Utils 2
Contributions to the T4Utils 2 library is strongly encouraged from TerminalFour community members to enhance and optimize this library. Before opening an issue or creating a pull request, please read through this documentation.

## Linting
As to make this project more accessible to other developers within the TerminalFour community, we've removed JSHint linting from the Gulp build system. This means that to ensure the library stays with a consistent and error/warning free codebase, we request all contributors to utilize a JSHint linter in their IDE of choice.

If a pull request is made with Javascript errors/warnings, we will immediately decline the merge and request you make the necessary fixes utilizing a JSHint linter.

## Pull requests
These instructions were inspired by [Bootstrap's](https://github.com/twbs/bootstrap/) pull request information within their [contribution guidelines](https://github.com/twbs/bootstrap/blob/master/CONTRIBUTING.md#pull-requests):
1. [Fork](https://help.github.com/fork-a-repo/) the repo, clone your fork, and configure the remotes:
```bash
# Clone your fork of the repo into the current directory
git clone https://github.com/<your-username>/t4utils2.git
# Navigate to the newly cloned directory
cd t4utils2
# Assign the original repo to a remote called "upstream"
git remote add upstream https://github.com/virginiacommonwealthuniversity/t4utils2.git
```
2. If you cloned a while ago, get the latest changes from upstream:
```bash
git checkout master
git pull upstream master
```
3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:
```bash
git checkout -b <topic-branch-name>
```
4. Ensure your commits are contextual and informative as to what changes/additions/deletions have been made
5. Locally merge (or rebase) the upstream development branch into your topic branch:
```bash
git pull [--rebase] upstream master
```
6. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description against the master branch.
