import * as core from '@actions/core'
import {getOauth2ClientOrError, getOauth2CredentialOrError} from './input'
import {google} from 'googleapis'

async function run(): Promise<void> {
  try {
    const {id, secret, redirectUri} = getOauth2ClientOrError()
    const auth = new google.auth.OAuth2(id, secret, redirectUri)
    const credential = getOauth2CredentialOrError()
    auth.setCredentials(credential)

    const drive = google.drive({version: 'v3', auth})
    const response = await drive.files.list({
      fields: 'nextPageToken, files(id, name)'
    })
    core.setOutput('result', response.data.files)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
