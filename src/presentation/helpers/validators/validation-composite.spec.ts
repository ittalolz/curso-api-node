import { Validation } from '../../controllers/signup/signup-protocols'
import { MissimParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'

describe('Validation Composite', () => {
  test('Deve retornar um erro se qualquer validation falhar', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissimParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissimParamError('field'))
  })
})
