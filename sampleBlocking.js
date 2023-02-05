// sample blocking file because readFileSync is blocking and the async one isnt
const fs = require('fs/promises')
const path = require('path')
// const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')

// console.log(result)

// // using callback syntax
// fs.readFile(
//   path.join(__dirname, 'package.json'),
//   'utf-8',
//   (err, data) => {
//     console.log(`async callback from readFile:`)
//     console.log(data)
// })

// // using promise chain
// fs.promises.readFile(path.join(__dirname, 'package.json'),'utf-8')
//   .then((data) => {
//     console.log(`Promise chain resultAsync:`)
//     console.log(data)
//   })

// // use async await
// async function getFile() {
//   const data = await fs.promises.readFile(path.join(__dirname, 'package.json'),'utf-8')
//   console.log('inside of getFile(), trying an async function:')
//   console.log(data)
//   return data
// }

// getFile()

const read = async () => {
  return fs.readFile(path.join(__dirname, 'package.json'), 'utf-8')
}

let resultAsync
read().then((result) => {
  resultAsync = result
  console.log(resultAsync)
})