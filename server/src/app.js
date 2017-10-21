const express = require('express')
const bodyPareser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyPareser.json())
app.use(cors())

app.get('/status', (req, res) => {
    res.send({
        message: 'up and running'
    })
})

app.listen(process.env.PORT || 8081)
