import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { Validation } from '../../presentation/helpers/validators/validation'
import { CompareFieldsValidation } from '../../presentation/helpers/validators/compare-fields-validation'
import { EmailValilidadation } from '../../presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

jest.mock('../../presentation/helpers/validators/validation-composite')

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValilidadation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
