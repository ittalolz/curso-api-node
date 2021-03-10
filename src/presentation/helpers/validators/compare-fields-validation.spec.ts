import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../errors'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('fieldName', 'fieldToCompareName')
}

describe('CompareFields Validation', () => {
  test('Deve retornar um InvalidParamError se validacao falhar', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldName: 'any_value', fieldToCompareName: 'another_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompareName'))
  })

  test('Deve não retornar se tiver sucesso na validação', () => {
    const sut = makeSut()
    const error = sut.validate({ fieldName: 'any_value', fieldToCompareName: 'any_value' })
    expect(error).toBeFalsy()
  })
})
