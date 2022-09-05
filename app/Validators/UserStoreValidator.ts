import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserStoreValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.minLength(6)]),
    cpfCnpj: schema.string({}, [rules.cpfCnpj()]),
    zipCode: schema.string({}, [rules.minLength(8)]),
    streetName: schema.string(),
    streetNumber: schema.number(),
  })

  public messages: CustomMessages = {
    'email.unique': 'O e-mail informado já está sendo utilizado',
    'email.required': 'O e-mail é obrigatório',
    'email.email': 'O e-mail informado não é válido',
    'password.required': 'A senha é obrigatória',
    'password.minLength': 'A senha deve ter no mínimo 6 caracteres',
    'cpfCnpj.cpfCnpj': 'O CPF ou CNPJ informado não é válido',
    'cpfCnpj.required': 'O CPF ou CNPJ é obrigatório',
  }
}
