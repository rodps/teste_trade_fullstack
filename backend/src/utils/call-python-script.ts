import { exec } from 'child_process'

const callPythonScript = async (path: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    exec(`python3 ${path}`, (error, stdout) => {
      if (error != null) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })
  })
}

export { callPythonScript }
