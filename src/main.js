import core from '@actions/core'
import tool from '@actions/tool-cache'
import exec from '@actions/exec'
import path from 'node:path'
import fs from 'node:fs'

export async function embraceioDownload() {
  const version = core.getInput('version')

  const embraceDownloadUrl = `https://embrace-downloads-prod.s3.amazonaws.com/embrace_${version}.zip`

  core.info(`Downloading ${embraceDownloadUrl}`)
  const downloadPath = await tool.downloadTool(embraceDownloadUrl)

  core.debug(`Extracting file ${downloadPath} ...`)
  const extractedFolder = await tool.extractZip(downloadPath)
  core.debug(`Extracted file to ${extractedFolder} ...`)

  fs.renameSync(path.join(extractedFolder, 'upload'), path.join(extractedFolder, 'embrace-upload'))
  core.debug('Adding to the cache ...')
  const cachedPath = await tool.cacheDir(
    extractedFolder,
    'embrace-upload',
    version,
    process.arch
  )

  core.addPath(cachedPath)
  core.info(`Downloaded to ${cachedPath}`)
}

export async function showVersion() {
  core.info('Show version')
  await exec.exec('embrace-upload --version')
}

export async function run() {
  try {
    await embraceioDownload()
    await showVersion()
    process.exitCode = core.ExitCode.Success
  } catch (error) {
    core.setFailed(error.message)
  }
}
