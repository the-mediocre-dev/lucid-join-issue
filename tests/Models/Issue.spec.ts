import { test } from '@japa/runner'

import Database from '@ioc:Adonis/Lucid/Database'

import Issue from 'App/Models/Issue'
import CommentFactory from 'Database/factories/CommentFactory'
import IssueFactory from 'Database/factories/IssueFactory'

test.group('Issues', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('joins on the comments table and correctly serializes the results', async ({ assert }) => {
    const issue = await IssueFactory.create()

    await CommentFactory.merge({
      content: 'comment 1',
      issueId: issue.id,
    }).create()

    await CommentFactory.merge({
      content: 'comment 2',
      issueId: issue.id,
    }).create()

    const results = await Issue.query().join('comments', 'comments.issue_id', '=', 'issues.id')

    assert.lengthOf(results, 2)
    assert.strictEqual(results[0].id, issue.id)
    assert.strictEqual(results[1].id, issue.id)
  })
})
