const express = require('express')

const app = express()

// ROUTES
const productos = require('./routes/productos')
const carrito = require('./routes/carrito')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api/productos', productos)
app.use('/api/carrito', carrito)


app.listen(8080, () => {
  console.log('Server is running on port 8080')
})