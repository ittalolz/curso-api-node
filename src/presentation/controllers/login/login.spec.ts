import { LoginController } from './login'
import { badRequest } from '../../helpers/http-helper'
import { MissimParamError } from '../../errors'

describe('Login Controller', () => {
  test('Deveveria retornar 400 se nao for fornecido email ', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissimParamError('email')))
  })

  test('Deveveria retornar 400 se nao for fornecido email ', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissimParamError('password')))
  })
})
