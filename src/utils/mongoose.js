import mongoose from 'mongoose'
const { connect, connection } = mongoose
const conn = {
    isConnected: false
}
export async function connectDB() {
    if (conn.isConnected) {
        return
    }
    const db = await connect('mongodb://127.0.0.1:27017/' + process.env.DB_NAME)

    conn.isConnected = db.connections[0].readyState
}
connection.on('connected', () => {

})

connection.on('error', (err) => {
    console.log(err)
}
)