import path from 'path'
import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'

interface IUploadConfig {
  directory: string
  storage: StorageEngine
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

const sanitizeFileName = (fileName: string): string =>
  fileName.replace(/[^a-zA-Z0-9.-]/g, '')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(_request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const sanitizedName = sanitizeFileName(file.originalname)
      const fileName = `${fileHash}-${sanitizedName}`

      return callback(null, fileName)
    },
  }),
} as IUploadConfig
