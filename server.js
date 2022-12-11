import express from "express"
const app = express()
import cors from "cors"

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("server is up and running")
})

app.post('/score', (req, res) => {
    const {gameTime, correct} = req.body
    console.log(gameTime, correct)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on ${process.env.PORT || 3000}`)
})
