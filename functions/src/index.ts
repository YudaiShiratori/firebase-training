import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
export const holaworld = functions.https.onRequest((request, response) => {
  response.send('Hola')
})
