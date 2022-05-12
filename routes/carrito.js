const express = require('express')


const { Router } = express

const router = new Router

// Contenedor
const Carrito = require('../contenedores/classCarrito.js')

// CONTENEDOR DE CARRITOS
const contenedorCart = new Carrito('./data/carrito.json')



router.post('/', async (req, res) => {
  newCarrito = req.body
  res.send(await contenedorCart.saveC(newCarrito))
})

router.delete('/:id', (req, res) => {
  let id = parseInt(req.params.id)
  res.send(contenedorCart.deleteCById(id))
})

router.get('/:id/productos', async (req, res) => {
  let id = parseInt(req.params.id)
  res.send(await contenedorCart.getCById(id))
})

router.post('/:id/productos', async (req, res) => {
  let id = parseInt(req.params.id)
  let newProd = req.body
  await contenedorCart.addPalC(id, newProd)
  res.send({
    'Nuevo Producto': newProd,
    'Agregado al carrito': id
  })
})

router.delete('/:id/productos/:id_prod', (req, res) => {
  let id = parseInt(req.params.id);
  let id_prod = parseInt(req.params.id_prod)
  res.send(contenedorCart.deletePById(id, id_prod))
})

module.exports = router