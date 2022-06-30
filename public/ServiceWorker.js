self.addEventListener('push', function (event) {
  const data = event.data.json()
  const promiseChain = self.registration.showNotification(data.title, {
    body: data.content
    // icon: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
  })
  event.waitUntil(promiseChain)
})
