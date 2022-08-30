import { isValid as isValidCnpj } from '@fnando/cnpj'
/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import { validator } from '@ioc:Adonis/Core/Validator'
import CPF from 'cpf-check'

validator.rule('cpfCnpj', (value, _, options) => {
  if (!CPF.validate(value) && isValidCnpj(value)) {
    options.errorReporter.report(
      options.pointer,
      'cpfCnpj',
      'Cpf ou CNPJ invalido',
      options.arrayExpressionPointer
    )
  }
})
