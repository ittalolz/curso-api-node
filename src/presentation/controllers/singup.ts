import { HttpResponse, HttpRequest } from '../protocols/http'
import { MissimParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'

export class SingUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requeiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requeiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissimParamError(field))
      }
    }
  }
}
