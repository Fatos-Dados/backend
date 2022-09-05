import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collaborator from 'App/Models/Collaborator'
import User from 'App/Models/User'

export default class CollaboratorsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { name, password, email, cpfCnpj, role } = request.only([
      'name',
      'password',
      'email',
      'cpfCnpj',
      'role',
    ])

    const collaborator = await Collaborator.create({
      name,
      password,
      email,
      cpfCnpj,
      role,
    })

    const user = auth!.user as User
    await collaborator.related('user').associate(user)
    await collaborator.load('user')

    return response.created({
      content: collaborator,
      message: 'Colaborador criado com sucesso',
    })
  }

  public async index({ response, auth }: HttpContextContract) {
    const user = auth.user as User
    const collaborator = await user.related('collaborators').query().where('user_id', user.id)

    return response.ok({
      content: collaborator,
      message: 'Colaborador recuperado com sucesso',
    })
  }
}
