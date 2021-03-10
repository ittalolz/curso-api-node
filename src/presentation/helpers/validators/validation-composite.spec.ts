import { Validation } from '../../controllers/signup/signup-protocols'
import { MissimParamError } from '../../errors'
import { ValidationComposite } from './validation-composite'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Deve retornar um erro se qualquer validation falhar', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissimParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissimParamError('field'))
  })
})
