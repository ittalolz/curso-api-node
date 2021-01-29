import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (htttpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(htttpRequest)
    return null
  }
}
