const express = require('express')
const bodyPareser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyPareser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Sequelize started on port ${config.port}`)
  })
