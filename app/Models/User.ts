import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Perm from './Perm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public cpfCnpj: string

  @column()
  public zipCode: string

  @column()
  public streetName: string

  @column()
  public streetNumber: number

  @hasMany(() => Perm)
  public perms: HasMany<typeof Perm>

  @column({ serializeAs: null })
  public password: string

  @column()
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

  public static async hasPerm(user: User, perm: string | string[]): Promise<boolean> {
    await user.load('perms')
    const perms = user.perms.map((p) => p.name)

    if (typeof perm === 'string') {
      return perms.includes(perm)
    }

    return perm.every((p) => perms.includes(p))
  }

  public static async isStaff(user: User) {
    return await User.hasPerm(user, 'staff')
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
