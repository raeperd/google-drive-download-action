import {getInput} from '@actions/core'

export function getOauth2ClientOrError(): Oauth2Client {
  return {
    secret: getInputOrError('clientSecret'),
    id: getInputOrError('clientId'),
    redirectUri: getInputOrError('redirectUri')
  }
}

export function getOauth2CredentialOrError(): Oauth2Credential {
  const credential = getInputOrError('credential_json')
  return JSON.parse(credential)
}

export function getQueryString(): string {
  return getInputOrError('q')
}

export function getPath(): string {
  return getInputOrError('path')
}

interface Oauth2Client {
  secret: string
  id: string
  redirectUri: string
}

interface Oauth2Credential {
  access_token: string
  refresh_token: string
  scope: string
  token_type: string
  expiry_date: number
}

function getInputOrError(name: string): string {
  const input = getInput(name)
  if (!input || input.length === 0) {
    throw Error(`${name} must be provided`)
  }
  return input
}
