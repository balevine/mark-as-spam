const github = require('@actions/github')
const process = require('process')
const octokit = new github.GitHub(process.env.GITHUB_TOKEN)
const command = '[/spam]'
const spamLabel = 'Spam'

async function run() {
  const payload = github.context.payload
  const eventName = github.context.eventName
  const action = payload.action
  const issue = payload.issue
  const repository = payload.repository
  const owner = repository.owner.login
  const repo = repository.name
  const issueNumber = issue.number

  if (eventName == 'issue_comment' && action == 'created') {
    let body = payload.comment.body
    let lastCharacters = body.slice(-command.length)
    if (lastCharacters == command) {
      console.log(`Matched ${command} command`)
      // Apply 'Spam' label
      await applySpamLabel(issue, owner, repo, issueNumber)
      // Lock issue
      await lockIssue(owner, repo, issueNumber)
      // Close issue
      await closeIssue(owner, repo, issueNumber)
    }
  }
}

async function applySpamLabel(issue, owner, repo, issueNumber) {
  // does a 'Spam' label already exist for this issue?
  const existingLabels = issue.labels
  let labelExists = false
  for (l in existingLabels) {
    if (existingLabels[l].name == 'Spam') {
      labelExists = true
      return true
    }
  }

  // apply the 'Spam' label
  try {
    return octokit.issues.addLabels({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      labels: [spamLabel]
    })
  } catch (err) {
    return console.log(err)
  }
}

async function lockIssue(owner, repo, issueNumber) {
  try {
    return octokit.issues.lock({
      owner: owner,
      repo: repo,
      issue_number: issueNumber
    })
  } catch (err) {
    return console.log(err)
  }
}

async function closeIssue(owner, repo, issueNumber) {
  try {
    return octokit.issues.update({
      owner: owner,
      repo: repo,
      issue_number: issueNumber,
      state: 'closed'
    })
  } catch (err) {
    return console.log(err)
  }
}

run()
