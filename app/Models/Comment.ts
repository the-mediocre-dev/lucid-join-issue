import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Issue from 'App/Models/Issue'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public issueId: number

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*
   * Relationships
   */

  @belongsTo(() => Issue)
  public issue: BelongsTo<typeof Issue>
}
