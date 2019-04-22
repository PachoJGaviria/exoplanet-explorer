
/**
 * @param {string} url
 */
function async (url) {
  return new Promise((resolve, reject) => {
    if (url === 'example.json') {
      console.log('async resolve')
      const data = { urls: ['one.json', 'two.json'] }
      resolve(data)
    } else {
      console.log('async reject')
      reject(Error('Not found'))
    }
  })
}

function recovery () {
  return new Promise((resolve, reject) => {
    console.log('recovery')
    resolve()
    // reject(Error('Impossible'))
  })
}

function ahhIGiveUp () {
  console.log('end!')
}

let urls = []
async('example.json')
  .then(function (data) {
    urls = data.urls
    return async(urls[0])
  })
  .then(undefined, function (e) {
    console.log(1)
    return recovery()
  })
  .catch(function (e) {
    console.log(2)
    return recovery()
  })
  .then(function () {
    console.log(3)
    return async(urls[1])
  })
  .then(async, function (e) {
    console.log(4)
    ahhIGiveUp()
  })
