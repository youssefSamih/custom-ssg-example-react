import sharp from 'sharp'
import glob from 'glob'
import path from 'path'
import { promisify } from 'util'
import mkdirp from 'mkdirp'

const globp = promisify(glob)
const constrain = { height: 1200, width: 1200 }
const resizeOptions = [
  constrain.width,
  constrain.height,
  {
    fit: 'inside',
  },
]

const resizeImage = async () => {
  try {
    const mediaPath = path.join(process.cwd(), 'media')
    const files = await globp(`${mediaPath}/**.jpg`)
    for (const file of files) {
      const image = await sharp(file)
        .resize(...resizeOptions)
        .toFile('output.png')
      console.log('debug')
    }
    console.log(files)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

resizeImage()
