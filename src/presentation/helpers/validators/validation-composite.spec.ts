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
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidation(),
    makeValidation()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Deve retornar um erro se qualquer validation falhar', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissimParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissimParamError('field'))
  })

  test('Deve retornar o primeiro erro que ocorrer caso ocorra mais de um', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissimParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new Error())
  })
})
