import express, { Application } from 'express'
import db from './config/db'
import env from './config/secret'
import setup from './config/setup'
import routes from './routes/routes'

// setup server
const PORT: string | number = env.PORT || 4000
const app: Application = express()

// setup express
setup.express(app)

// routes
app.use('/api', routes.auth())
app.use('/api', routes.guest())

// error handling
setup.handler(app)

// run server
db.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
