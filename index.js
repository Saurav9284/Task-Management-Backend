const express = require('express')
const cors = require('cors')
const UserController = require('./Controllers/user.controller')
const {connection,PORT} = require('./Config/db')

const app = express()

app.use(cors())
app.use(express.json())


app.get('/', (req,res) => {
    res.send({msg:'API is live!'})
})

app.use('/user', UserController)
app.listen(PORT, async () => {
    try {
        await connection
        console.log('Connected to DB')
    } catch (error) {
        console.log(error)
    }
    console.log(`Server running on PORT:${PORT}`)
})