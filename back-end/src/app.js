const express = require('express')
const { swaggerSpec, swaggerUi } = require("./swagger/swagger")
const cors = require('cors')
const { errorHandler } = require('./middleware/errorhandling')
const { authenticationMiddleware } = require('./middleware/authentication')
const { port } = require('./config/env')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

require('./config/mongoose-connection')
require('./config/reddis-connection')
require('./seeder')()

const app = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(cors({
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/auth', require('./routes/auth'))

app.use('/app', authenticationMiddleware, require('./routes/route'))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})