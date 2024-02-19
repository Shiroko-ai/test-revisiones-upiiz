import mongoose from 'mongoose'
const { connect, connection } = mongoose
const conn = {
  isConnected: 0
}
export async function connectDB (): Promise<void> {
  if (conn.isConnected === 1) {
    return
  }
  if (process.env.MONGODB_URL === undefined || process.env.DB_NAME === undefined) {
    throw new Error('MONGODB_URL or DB_NAME is not defined')
  }
  const db = await connect(process.env.MONGODB_URL)

  conn.isConnected = db.connections[0].readyState
}
connection.on('connected', () => {
  console.log('Mongoose connected to db')
})

connection.on('error', (err) => {
  console.log(err)
}
)
