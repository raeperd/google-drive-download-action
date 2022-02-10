import {setFailed} from '@actions/core'
import {drive_v3, google} from 'googleapis'
import {downloadFileByQuery} from './gdrive'
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
    const path = getPath()
    await downloadFileByQuery(drive, query, path)
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
