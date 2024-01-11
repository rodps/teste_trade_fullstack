import bcrypt from 'bcrypt'

const compare = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

const hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

const hashPassword = {
  compare,
  hash
}

export { hashPassword }
