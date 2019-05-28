const cookieParser = require('cookie-parser')

require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

//use express middleware to handle cookies with jwt
server.express.use(cookieParser());

//TODO use express middleware to handle populating users

server.start(
    {
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL
        },
    },
    details => {
        console.log(`Server is running on: http://localhost:${details.port}`)
    }
)

