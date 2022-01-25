import {mkdir, writeFile} from 'fs/promises'
import {drive_v3} from 'googleapis'
import {join} from 'path'
import Drive = drive_v3.Drive

export async function downloadFile(
  drive: Drive,
  file: drive_v3.Schema$File,
  path: string
): Promise<void> {
  if (file.name == null || file.id == null) {
    throw Error(`Invalid file ${file}`)
  }
  if (file.mimeType === 'application/vnd.google-apps.folder') {
    // eslint-disable-next-line no-console
    console.log(`Starts to download folder ${file.name} in ${path}`)
    return await downloadFolder(drive, file, path)
  }
  // eslint-disable-next-line no-console
  console.log(`Starts to download file ${file.name} in ${path}`)
  const {data} = await drive.files.get({
    fileId: file.id,
    alt: 'media'
  })
  try {
    return await writeFile(join(path, file.name), JSON.stringify(data))
  } catch (error) {
    throw Error(
      `Failed to writeFile ${file} in path ${join(path, file.name)} \n
      ${error}`
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
  await mkdir(dirPath)
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
