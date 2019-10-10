# Mark As Spam

Use a single command to mark your GitHub issue as spam. Label, lock, and close the issue in one action.

## How to set it up

Add a workflow to your GitHub repository that contains this information:

```
name: Spam

on: issue_comment
jobs:
  mark-as-spam:
    name: mark as spam
    runs-on: ubuntu-latest
    steps:
      - name: close issue
        uses: balevine/mark-as-spam@production
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Check out [GitHub's documentation](https://help.github.com/en/articles/configuring-a-workflow) to read more about adding GitHub Action workflows to your GitHub repositories.

## How to use it

Once the workflow is set up in your repository, you can mark issues as spam by adding a new comment to the issue with this text:

> [/spam]

_If the issue comment contains other text, the `[/spam] command must be the final string in the comment._

The issue will be locked and closed and a `Spam` label will be applied to it.
