/**
 * @type {import('next').NextConfig}
 */
import path from 'path'

const __dirname = path.resolve()
 
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
}
