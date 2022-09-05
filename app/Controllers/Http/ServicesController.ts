import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicesController {
  public async store({ request, response }: HttpContextContract) {
    return response.created()
  }
}
