# Google drive download action

[![.github/workflows/test.yml](https://github.com/raeperd/google-drive-download-action/actions/workflows/test.yml/badge.svg)](https://github.com/raeperd/google-drive-download-action/actions/workflows/test.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=raeperd_google-drive-download-action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=raeperd_google-drive-download-action)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=raeperd_google-drive-download-action&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=raeperd_google-drive-download-action)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=raeperd_google-drive-download-action&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=raeperd_google-drive-download-action)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=raeperd_google-drive-download-action&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=raeperd_google-drive-download-action)  
Github action for downlaoding google drive files or folder using [Drives: list API](https://developers.google.com/drive/api/v3/reference/drives/list)

## Usage

```yaml
runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: raeperd/raeperd/google-drive-download-action@v1.0
        with:
          clientSecret: ${{ secrets.CLIENT_SECRET }}
          clientId: ${{ secrets.CLIENT_ID }}
          redirectUri: ${{ secrets.REDIRECT_URI }}
          credential_json: ${{ secrets.CREDENTIAL_JSON }}
          q: "'1U-2NgagKTnqkIZrML52A2SsD9HDDeDN7' in parents"
          path: "./"
```



## Getting Started

### What you needs

1. Create Google drive application
2. Oauth2 credentials with refresh token

#### Create Google drive application

- [Enable the Google Drive API  |  Google Developers](https://developers.google.com/drive/api/v3/enable-drive-api)
  1. Go to the [Google API Console](https://console.developers.google.com/).
  2. Select a project.
  3. In the sidebar on the left, expand **APIs & auth** and select **APIs**.
  4. In the displayed list of available APIs, click the Drive API link and click **Enable API**.

#### Generate Oauth2 Credentials

- Create credential.json using [Node.js quickstart  |  Google Drive API  |  Google Developers](https://developers.google.com/drive/api/v3/quickstart/nodejs)
