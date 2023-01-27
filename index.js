require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./note')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
  })
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id == id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
  })

app.put('/api/notes/:id', (request, response) => {
  const body = request.body
  notes = notes.map(note => note.id === body.id ? body : note)
  response.json(body)
})
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })