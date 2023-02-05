setTimeout(() => {
  throw new Error('oops')
}, 300)

process.on('uncaughtException', () => {
  console.log(`an uncaughtExpection occurred`)
})

process.on('unhandledRejection', () => {
  console.log(`an uncaughtRejection occurred`)
})