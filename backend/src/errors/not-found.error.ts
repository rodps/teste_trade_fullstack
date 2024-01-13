import { ApiError } from './api-error'

class NotFoundError extends ApiError {
  constructor (message: string) {
    super(message)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

export { NotFoundError }
