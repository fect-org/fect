// update original icon source
import path from 'path'
import { fs } from 'internal'

function main() {
  fetch('https://vercel.com/design/icons').then((v) =>
    v.text().then((html) => {
      fs.outputFile(path.join(__dirname, '.icon'), html, 'utf8')
    })
  )
}

main()
