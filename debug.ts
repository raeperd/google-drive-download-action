import {setFailed} from '@actions/core'
import {drive_v3, google} from 'googleapis'
import {join} from 'path'
import {downloadFileByQuery} from './src/gdrive'

// Configure below constants, and do not commit changes
const CLIENT_ID = ''
const CLIENT_SECRET = ''
const REDIRECT_URI = ''
const CREDENTIAL_JSON = JSON.parse(
  '{' +
    '"access_token":"",' +
    '"refresh_token":"",' +
    '"scope":"https://www.googleapis.com/auth/drive.readonly",' +
    '"token_type":"Bearer",' +
    '"expiry_date":1644050643091' +
    '}'
)

async function main(): Promise<void> {
  try {
    const drive = initializeDebuggingDrive()
    // Configure query and path variable to debug
    const query =
      "'1Co8BSgaZDb9ZIGmrmkVH-XB_1-Waa3-O' in parents and (name = 'articles' or name = 'references')"
    const path = join(process.cwd(), '/test')
    await downloadFileByQuery(drive, query, path)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

function initializeDebuggingDrive(): drive_v3.Drive {
  const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
  auth.setCredentials(CREDENTIAL_JSON)
  return google.drive({version: 'v3', auth})
}

main()
