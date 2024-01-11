import { ApiError } from './api-error'

class UserAlreadyExistsError extends ApiError {
  constructor (message: string) {
    super(message)
    this.name = 'UserAlreadyExistsError'
    this.statusCode = 409
  }
}

export { UserAlreadyExistsError }
