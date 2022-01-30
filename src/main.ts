import {info, setFailed} from '@actions/core'
import {drive_v3, google} from 'googleapis'
import {downloadFile} from './gdrive'
import {
  getOauth2ClientOrError,
  getOauth2CredentialOrError,
  getPath,
  getQueryString
} from './input'

async function main(): Promise<void> {
  try {
    const drive = initializeDrive()
    const query = getQueryString()
    const {data} = await drive.files.list({
      q: query
    })
    if (!data.files) {
      setFailed(`No files found using query ${query}`)
      return
    }
    info(`${JSON.stringify(data.files, null, 4)}`)
    const path = getPath()
    await Promise.all(
      data.files.map(async file => {
        await downloadFile(drive, file, path)
      })
    )
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

function initializeDrive(): drive_v3.Drive {
  const {id, secret, redirectUri} = getOauth2ClientOrError()
  const auth = new google.auth.OAuth2(id, secret, redirectUri)
  const credential = getOauth2CredentialOrError()
  auth.setCredentials(credential)
  return google.drive({version: 'v3', auth})
}

main()
