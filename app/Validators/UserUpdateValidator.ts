import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.number(),
    name: schema.string(),
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6)]),
    cpfOrCnpj: schema.string({}, [rules.cpfCnpj()]),
  })

  public messages: CustomMessages = {
    'id.required': 'O id é obrigatório',
    'email.exists': 'O e-mail informado não existe',
    'email.required': 'O e-mail é obrigatório',
    'email.email': 'O e-mail informado não é válido',
    'password.required': 'A senha é obrigatória',
  }
}
