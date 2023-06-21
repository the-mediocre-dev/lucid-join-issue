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

  test('query the issue id', async () => {
    const issue = await IssueFactory.create()
    const comment = await CommentFactory.merge({
      content: 'hello world',
      issueId: issue.id,
    }).create()

    await Issue.query()
      .join('comments', 'comments.issue_id', '=', 'issues.id')
      .where('comments.id', '=', comment.id)
      .select('id')
  })
})
