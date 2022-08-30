import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserStore from 'App/Validators/UserStoreValidator'
import UserUpdate from 'App/Validators/UserUpdateValidator'

export default class UsersController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { name, password, email } = await request.validate(UserStore)
    const user = await User.create({ name, password, email, rememberMeToken: 'true' })
    const token = await auth.attempt(email, password)
    return response.created({
      content: { user, token },
      message: 'Usuário criado com sucesso',
    })
  }

  public async show({ response, auth }: HttpContextContract) {
    const user = auth.user

    return response.ok({
      content: { user },
      message: 'Usuário recuperado com sucesso',
    })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const { id, name, password, email } = await request.validate(UserUpdate)
    const user = await User.findOrFail(id)
    await bouncer.authorize('updateUser', user)

    const updatedUser = await User.updateUser(user, { id, name, password, email })
    return response.accepted({
      content: { updatedUser },
      message: 'Usuário atualizado com sucesso',
    })
  }

  // public async destroy({ request, response, bouncer }: HttpContextContract) {}

  // public async index({ auth }: HttpContextContract) {
  //   return response.ok({
  //     content: { users },
  //     message: 'Usuários recuperados com sucesso',
  //   })
  // }
}
