const fs = require('node:fs/promises')
const { rootDir } = require('./config.js')

const dataSource = require('./data-source')

const files = ['tasks', 'users']
async function resetDbJson() {
  for (const sourceName in dataSource) {
    await fs.writeFile(
      `${rootDir}/${sourceName}.json`,
      JSON.stringify(dataSource[sourceName])
    )
  }
}

resetDbJson()
