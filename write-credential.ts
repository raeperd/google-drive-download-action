import {authenticate} from '@google-cloud/local-auth'
import {writeFile} from 'fs'
import {join} from 'path'

const CREDENTIAL_PATH = join(__dirname, 'credential.json')

async function quickstart(): Promise<void> {
  const localAuth = await authenticate({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    keyfilePath: join(__dirname, 'oauth2.keys.json')
  })
  return writeFile(
    CREDENTIAL_PATH,
    JSON.stringify(localAuth.credentials),
    err => {
      // eslint-disable-next-line no-console
      if (err) return console.error(err)
    }
  )
}

quickstart()
