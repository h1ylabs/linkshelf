#!/bin/bash

# lint & format codes only on stage.
# echo \"yarn lint-staged\" > .husky/pre-commit

# lint commit messages.
# echo \"yarn commitlint \${1}\" > .husky/commit-msg

# add commit template to local project.
git config commit.template .github/COMMIT_TEMPLATE.txt
git config code.editor "code --wait"