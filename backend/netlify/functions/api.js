const serverless = require('serverless-http')

const { PORT = 3000, BASE_URL } = process.env

const app = require('../../index')

app.listen(PORT, () => {
  console.log(`Server berjalan di: ${BASE_URL}`)
})

module.exports.handler = serverless(app)
