import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import User from './User'

export default class Collaborator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ columnName: 'cpf_cnpj' })
  public cpfCnpj: string

  @column({})
  public role: 'gestor' | 'vendedor' | 'supervisor'

  @column()
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @beforeSave()
  public static async hashPassword(collaborator: Collaborator) {
    if (collaborator.$dirty.password) {
      collaborator.password = await Hash.make(collaborator.password)
    }
  }

  public static async findByEmail(email: string) {
    return await Collaborator.findByOrFail('email', email)
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
