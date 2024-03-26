const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send({msg:'API is live!'})
})

app.listen(8080, () => {
    console.log('Sever is running on 8080')
})