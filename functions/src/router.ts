import * as functions from 'firebase-functions'
import * as express from 'express'
import * as corsLib from 'cors'
// import { request } from 'https';
import UserController from './controller/UserController'
import Result from './Result'

const app = express()
const cors = corsLib()
const router = express.Router()
router.use((request, response, next) => {
  return cors(request, response, () => {
    /**
     * middleware
     * クロスドメイン制約や認証処理を行う
     */
    console.log('request', request.body)
    next()
  })
})

router.use('/item', (request, response) => {
  const item: { id: number, message: string, postData: any } = {
    id: 0, message: 'itemm', postData: undefined
  }
  if (request.method === 'POST') {
    item.postData = request.body !== undefined && 'data' in request.body ? request.body['data'] : undefined
  }
  response.status(200).send(item)
})

router.use('/page/:id', (request, response) => {
  const item: { id: number | undefined, message: string } = {
    id: undefined, message: 'pagee'
  }
  if (request.method === 'GET') {
    item.id = Number(request.params.id)
  }
  response.status(200).send(item)
})

app.use('/v1', router)

const api = functions.https.onRequest(app)

export { api }


//トリガー
router.use('/user', async (request, response) => {
  let result: Result = { code: 200, message: '' }
  try {
    if (request.method === 'GET') {
      result = await new UserController().getUsers()
    } else if (request.method === 'POST') {
      result = await new UserController().createUser(request.body)
    } else if (request.method === 'PUT') {
      result = await new UserController().updateUser(request.body)
    } else if (request.method === 'DELETE') {
      result = await new UserController().deleteUser(request.body)
    }
  } catch(error) {
    result = { code: 400, message: error.message, error: error }
  }
  response.status(result.code).send(result)
})