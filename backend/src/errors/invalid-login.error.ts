class InvalidLoginError extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'InvalidLoginError'
  }
}

export { InvalidLoginError }
