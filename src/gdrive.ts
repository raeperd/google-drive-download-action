import {promises} from 'fs'
import {drive_v3} from 'googleapis'
import {info} from '@actions/core'
import {join} from 'path'
import Drive = drive_v3.Drive

export async function downloadFile(
  drive: Drive,
  file: drive_v3.Schema$File,
  path: string
): Promise<void> {
  if (file.name == null || file.id == null || file.mimeType == null) {
    throw Error(`Invalid file ${JSON.stringify(file, null, 4)}`)
  }
  if (file.mimeType === 'application/vnd.google-apps.folder') {
    return await downloadFolder(drive, file, path)
  }
  const {data} = await drive.files.get({
    fileId: file.id,
    alt: 'media'
  })
  const pathToWrite = join(path, file.name)
  try {
    await promises.writeFile(
      pathToWrite,
      fileContentsFromData(file.mimeType, data)
    )
    info(`Downloaded ${pathToWrite}`)
  } catch (error) {
    throw Error(
      `Failed to download ${pathToWrite} \n
      ${JSON.stringify(error, null, 4)}`
    )
  }
}

async function downloadFolder(
  drive: Drive,
  folder: drive_v3.Schema$File,
  path: string
): Promise<void> {
  if (folder.name == null) {
    throw Error(`Invalid folder without name \n ${folder}`)
  }
  const dirPath = join(path, folder.name)
  await promises.mkdir(dirPath)
  const {data} = await drive.files.list({
    q: `'${folder.id}' in parents`
  })
  if (!data.files) {
    return
  }
  await Promise.all(
    data.files.map(async file => {
      if (file.name != null) {
        await downloadFile(drive, file, dirPath)
      }
    })
  )
}

function fileContentsFromData(
  mimeType: string,
  data: drive_v3.Schema$File
): string {
  if (mimeType === 'application/json') {
    return JSON.stringify(data)
  }
  return data as string
}
