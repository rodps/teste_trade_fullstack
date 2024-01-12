import { ApiError } from './api-error'

class InvalidNumberOfTeamsError extends ApiError {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidNumberOfTeamsError'
    this.statusCode = 400
  }
}

export { InvalidNumberOfTeamsError }
