import { HttpResponse, HttpRequest, EmailValidator, Controller } from '../protocols'
import { MissimParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requeiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requeiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissimParamError(field))
        }
      }
      const { email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
