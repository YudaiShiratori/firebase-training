import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
// import { response } from 'express';

admin.initializeApp()
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello')
})

export const requestTest = functions.https.onRequest((request, response) => {
  console.log('method', request.method, 'content-type', request.headers['content-type'])
  const resultParam: any = { message: '' }
  let responseCode: number = 200
  try {
    const data = request.body
    const id: string = data !== undefined && 'id' in data? data.id : undefined
    if (request.method === 'GET') {
      resultParam.message = 'REQUEST method is GET'
    } else if (request.method === 'POST') {
      resultParam.message = `REQUEST method is POST. body is ${id}`
    } else if (request.method === 'PUT') {
      resultParam.message = 'REQUEST method id POST'
    } else if (request.method === 'DELETE') {
      resultParam.message = 'REQUEST method is DELETE'
    } 
  } catch (error) {
    responseCode = 500
    resultParam.message = error.message
  }
  response.status(responseCode).send({ code: responseCode, result: resultParam })
})
