import mongoose from 'mongoose'
const { connect, connection } = mongoose
const conn = {
  isConnected: 0
}
export async function connectDB (): Promise<void> {
  if (conn.isConnected === 1) {
    return
  }
  const db = await connect('mongodb://127.0.0.1:27017/' + process.env.DB_NAME)

  conn.isConnected = db.connections[0].readyState
}
connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

connection.on('error', (err) => {
  console.log(err)
}
)
