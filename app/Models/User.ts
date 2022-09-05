import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  hasOne,
  HasOne,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Collaborator from './Collaborator'

import Service from './Service'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ columnName: 'cpf_cnpj' })
  public cpfCnpj: string

  @column({ columnName: 'zip_code' })
  public zipCode: string

  @column({ columnName: 'street_name' })
  public streetName: string

  @column({ columnName: 'street_number' })
  public streetNumber: number

  @column({ serializeAs: null })
  public password: string

  @column({})
  public role: 'gestor'

  @hasMany(() => Collaborator)
  public collaborators: HasMany<typeof Collaborator>

  @hasOne(() => Service)
  public service: HasOne<typeof Service>

  @column({ columnName: 'remember_me_token' })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public static async findByEmail(email: string) {
    return await User.findByOrFail('email', email)
  }

  public static async updateUser(
    user: User,
    data: { id: number; name: string; password?: string; email?: string }
  ) {
    user.merge(data)
    return user.save()
  }
}
