const express = require('express')

// FS
const fs = require('fs')


const { Router } = express

const router = new Router

// Contenedor
const Productos = require('../src/contenedores/ClassProductos.js.js.js')

// CONTENEDOR DE PRODUCTOS
const contenedorProd = new Productos('./data/productos.json')

import {
  productosDao as productosApi,
} from './daos/index.js'


router.get('/:id?', (req, res) => {
  const id = parseInt(req.params.id)
  if (id) {
    res.send(contenedorProd.getById(id))
  }
  else {
    res.send(contenedorProd.getAll())
  }
})

function auth(req, res, next) {
  if (req.query.admin === 'true') {
    next()
  } else {
    res.send({ error: -1, description: `ruta ${req.path} para el metodo ${req.method} no autorizada` })
  }
}
router.post('/', auth, (req, res) => {
  const producto = req.body
  contenedorProd.save(producto)
  res.send({'Nuevo producto agregado': producto})
})


router.put('/:id', auth, (req, res) => {
  let id = parseInt(req.params.id)
  let productoUpload = req.body
  res.send(contenedorProd.putUpload(id, productoUpload))
})


router.delete('/:id', auth, (req, res) =>{
  let id = parseInt(req.params.id)
  res.send(contenedorProd.deleteById(id));
})
module.exports = router