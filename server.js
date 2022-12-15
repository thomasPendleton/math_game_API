const cors = require("cors")
const express = require("express")
const app = express()

const knex = require("knex")({
  client: "pg",
  connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  knex("highscores")
    .orderBy('score', 'desc')
    .where('score', '>', 10)
    .returning("*")
    .then((entries) => {
      res.json(entries)
    })
})

app.post("/score", (req, res) => {
  const { playerName, gameTime, correct, wrong, operation, level } = req.body

  knex("highscores")
    .insert({
      name: playerName,
      gametime: gameTime,
      score: correct,
      operator: operation,
      level: level,
      missed: wrong,
      date: new Date(),
    })
    .returning("*")
    .then((users) => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err);
      res.status(400).json('unable to add score')
    })


})

app.listen(process.env.PORT || 3005, () => {
  console.log(`app is running on ${process.env.PORT || 3005}`)
})
