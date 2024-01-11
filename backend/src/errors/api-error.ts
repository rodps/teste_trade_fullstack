class ApiError extends Error {
  statusCode: number
  constructor (message: string) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = 500
  }
}

export { ApiError }
