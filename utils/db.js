import mongoose from "mongoose";

const db = mongoose.connection;

db.on('connect', () => {
  console.log('database connection success')
})

db.on('error', (error) => {
  console.error(`database error ${error}`)
})

export default () => {
  return mongoose.connect(process.env.MONGOOSE_URL)
}
