import express from 'express';
import dotenv from 'dotenv'
import db from "./utils/db.js";

dotenv.config();


const app = express();


app.use(express.json())
app.use((req, res, next) => {
  res.status(404).json({message: "route not found!"})
})

app.use((err, req, res, next) => {
  return res.json({error: true, message: err.message})
})

try {

  await db();

  app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
  })
} catch (e) {
  console.log(`connection error ${e}`)
}
