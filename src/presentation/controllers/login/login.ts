import { Controller, HttpRequest, HttpResponse, Authentication } from './login-protocols'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http-helper'
import { MissimParamError } from '../../errors'
import { Validation } from '@/presentation/helpers/validators/validation'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const requeiredFields = ['email', 'password']
      for (const field of requeiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissimParamError(field))
        }
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
