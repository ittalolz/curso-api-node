import { RequiredFieldValidation } from './required-field-validation'
import { MissimParamError } from '../../errors'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('fieldName')
}

describe('RequiredField Validation', () => {
  test('Deve retornar um MissimParamError se validacao falhar', () => {
    const sut = makeSut()
    const error = sut.validate({ anotherFieldName: 'any_value' })
    expect(error).toEqual(new MissimParamError('fieldName'))
  })

  test('Deve não retornar se tiver sucesso na validação', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldName: 'any_value' })
    expect(error).toBeFalsy()
  })
})
