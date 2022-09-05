import Collaborator from 'App/Models/Collaborator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class SessionsController {
  public async store({ request, response, auth }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const token = await auth
      .use('api')
      .attempt(email, password)
      .catch(async () => {
        return await auth.use('client').attempt(email, password)
      })

    const user = await User.findByEmail(email).catch(async () => {
      return await Collaborator.findByEmail(email)
    })
    user.serialize()
    return response.created({
      content: { ...user.serialize(), ...token },
      message: 'Login realizado com sucesso',
    })
  }

  public async destroy({ response, auth }: HttpContextContract) {
    await auth.logout()

    response.noContent()
  }
}
