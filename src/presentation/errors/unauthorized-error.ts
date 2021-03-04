export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized - Não autorizado')
    this.name = 'UnauthorizedError'
  }
}
