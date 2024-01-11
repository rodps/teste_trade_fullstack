import { ApiError } from './api-error'

class InvalidLoginError extends ApiError {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidLoginError'
    this.statusCode = 401
  }
}

export { InvalidLoginError }
