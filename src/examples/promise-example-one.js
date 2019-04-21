new Promise(function (resolve, reject) {
  console.log('first')
  resolve()
  console.log('second')
  reject(new Error('four'))
}).then(function () {
  console.log('third')
}).catch(function (error) {
  console.log(error.message)
})
