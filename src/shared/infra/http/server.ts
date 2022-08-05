import 'reflect-metadata'
import 'dotenv/config'

import '../../infra/typeorm'
import '../../container'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { errors } from 'celebrate'

import routes from './routes'
import AppError from '../../errors/AppError'

const app = express()

app.disable('x-powered-by')
app.use(cors())
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
app.use(errors())

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = process.env.port || 3333
app.listen(PORT, () => console.log(`Server running at ${PORT}`))
